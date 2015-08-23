var db = require('../dao/db');
var conf = require('../conf/main');
var download = require('../lib/download').download;
var exec = require('child_process').exec;

var path = require('path');
var fs = require('fs');

exports.build = function (req, res) {
    var query = req.query;
    query.ids = query.ids || '';

    var arr = query.ids.split(',');

    db.queryUrls(arr, function (data) {
        data = data || {};

        var urls = [];

        data.forEach(function (item, idx) {
            if (urls.indexOf(item.url) === -1) {
                urls.push(item.url);
            }
        });

        var buildPath = getPath();

        download(urls, buildPath).then(
            function () {
                // do some build
                console.log(buildPath)
                exec('cd ' + buildPath, function () {
		            exec('hpm build', function (err) {
		                if (err) {
		                    console.log(err);
		                    return;
		                }
		                res.end('build done');
		                //res.redirect('/_package/xxx/xxx.amr')

		            });
		        });
            },
            function () {
                res.end('build error');
            }
        );
    });
};

function getPath() {

    var buildPath = Math.ceil(Math.random() * 10000000000) + '';

    while(fs.existsSync(path.join(conf.buildConf.dir, buildPath))) {
        buildPath = Math.ceil(Math.random() * 10000000000) + '';
    }

    return path.join(conf.buildConf.dir, buildPath);
}

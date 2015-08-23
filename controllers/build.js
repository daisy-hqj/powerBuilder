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

        var hpmfileContent = fs.readFileSync(path.join(__dirname, '../hpmfile.json')).toString();
        hpmfileContent = JSON.parse(hpmfileContent);

        if (query.version) {
            hpmfileContent.version = query.version;
        }

        download(urls, buildPath).then(
            function () {

                fs.writeFile(
                    path.join(buildPath, '/hpmfile.json'),
                    JSON.stringify(hpmfileContent)
                );

                // do some build
                exec('cd ' + buildPath + '&hpm build', function (err, data) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    res.end('build done');
                    //res.redirect('/_package/xxx/xxx.amr')
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

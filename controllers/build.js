var db = require('../dao/db');
var conf = require('../conf/main');
var download = require('../lib/download').download;

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
                res.end('build done');
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

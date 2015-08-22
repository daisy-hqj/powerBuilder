var downloadFile = require('../lib/download').downloadSingleFile;
var db = require('../dao/db');
var conf = require('../conf/main');
var fs = require('fs');

exports.show = function (req, res) {
    res.render('global');
};

exports.submit = function (req, res) {
    var params = req.body;

    var startTime = '';
    var endTime = '';

    if(params.occasion == "activities") {

        if (!params.start) {
            res.end('开始时间不能为空');

            return ;
        }

        if (!params.end) {
            res.end('结束时间不能为空');
            
            return ;
        }

        startTime = Date.parse(params.start.replace(/-/g, "/"));
        endTime = Date.parse(params.end.replace(/-/g, "/"));

        if (startTime > endTime) {
            res.end('开始时间不能晚于结束时间');

            return ;
        }

        if (endTime - startTime > 7 * 24 * 60 * 60 * 1000) {
            res.end('结束时间和开始时间不能相差7天以上');

            return ;
        }
    }

    if (!params.url) {
        res.end('资源 url 不能为空');
        
        return ;
    }

    downloadFile(params.url, conf.buildConf.dir).then(
        function (arr) {
            if (!arr.length) {
                res.end('资源下载错误');
                
                return ;
            }

            var filePath = arr[0].history[1];
            var size = fs.statSync(filePath).size;

            if (size > conf.buildConf.fileMaxSize) {
                res.end('资源大小不能大于 ' + conf.buildConf.fileMaxSize);

                return ;
            }

            db.push(params, size, startTime, endTime, function (list) {
                if (list) {
                    res.redirect('/list');
                }
                else {
                    res.end('数据异常');
                }
            });
        },
        function () {
            res.end('资源无法下载');
        }
    );
};

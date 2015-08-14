/**
 * @file 入口文件
 */

var path = require('path');
var exec = require('child_process').exec;
var download = require('./src/download').download;


// mock url
var url = 'https://t.alipayobjects.com/images/rmsweb/T1cDVgXbhkXXXXXXXX.jpg';

var buildDir = path.join(__dirname, '_build');

download(url, buildDir).then(
    function () {
        exec('cd ' + buildDir, function () {
            exec('hpm build', function (err) {
                if (err) {
                    console.log(err);
                }
            });
        });
    },
    function () {
        console.log('download failed');
    }
);

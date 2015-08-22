/** 
 * @file 下载资源到指定目录
 */

var mkdirp = require('mkdirp');
var Download = require('download');
var fs = require('fs');
var Promise = require('promise');

exports.download = function (urls, path) {
    if (!urls) {
        return Promise.reject('need param urls');
    }

    if (typeof urls === 'string') {
        urls = [urls];
    }

    var arr = [];

    urls.forEach(function (item, idx) {
        arr.push(downloadSingleFile(item, path));
    });

    return Promise.all(arr);
};

/**
 * 下载单个文件
 */
function downloadSingleFile(url, path) {
    var promise = new Promise(function (resolve, reject) {
        
        // 获取路径
        var dir = require('path').join(path, url.slice(url.indexOf('/') + 1, url.lastIndexOf('/')));

        // 创建制定目录
        mkdirp(dir, function (err) {
            if (err) {
                reject(err);
            }
            else {
                // 下载资源
                new Download(
                    {
                        mode: '755'
                    }
                )
                .get(url)
                .dest(dir)
                .run(
                    function(err, file){
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(file);
                        }
                    }
                );
            }
        });
    });

    return promise;
}

exports.downloadSingleFile = downloadSingleFile;

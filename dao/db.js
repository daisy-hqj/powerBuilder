var mysql = require('mysql');
var moment = require('moment');
var evconf = require('../conf/main').dbConf;//开发环境配置

exports.push = function (data, size, start, end, callback) {

    var connection = mysql.createConnection(evconf);
	var size = size || 0;

	connection.connect();

    var inserts = {
        url: data.url,
        size: parseInt(size, 10),
        name: data.name,
        appid: data.appid || '',
        ctime: moment().format('YYYY-MM-DD HH:mm:ss'),
        start: data.start + '',
        end: data.end + '',
        occasion: data.occasion
    };

	connection.query("INSERT INTO resource SET ?", inserts, function(err, rows, fields) {
		if (err) {
		    console.error('error connecting: ' + err);
		    return false;
		  }

          connection.end();
		  callback(rows);
	});
}

// 查询资源列表
exports.queryList = function (params, callback) {

    var connection = mysql.createConnection(evconf);
	connection.connect();

    var pageSize = 10000;

    var whereStr = 'WHERE occasion = "' + params.occasion + '"';

    if (params.occasion === 'activities') {
        var today = moment().format('YYYY-MM-DD');
        whereStr += ' AND start <= ' + today + ' AND end >= ' + today;
    }

    whereStr += ' ORDER BY ' + params.sortby + ' ' + params.orderby + ';';

	connection.query(
        'SELECT id, url, size, name, appid, ctime, start, end, occasion from resource ' + whereStr,
        function(err, result, fields) {
		    if (err) {
		        console.error('error connecting: ' + err);
                connection.end();
		        return false;
		    }

            result = result || [];

            result.forEach(function (item, idx) {
                item.ctime = moment(item.ctime).format('YYYY-MM-DD HH:mm:ss');
            });

            connection.query(
                'SELECT count(*) as count from resource ' + whereStr,
                function (err, data, fields) {
                    if (err) {
                        console.error('error connecting: ' + err);
                        connection.end();
                        return false;
                    }

                    connection.end();
                    callback({
                        count: data.count || 0,
                        list: result
                    });
                }
            );
		}
    );
}

// 查询资源 url
exports.queryUrls = function (ids, callback) {

    var connection = mysql.createConnection(evconf);
	connection.connect();

    connection.query(
        'select url from resource where id in (' + ids.join(',') + ')',
        function (err, rows, fields) {
            if (err) {
                console.error('error connecting: ' + err);
                connection.end();
                
                return false;
            }

            connection.end();
            callback(rows);
        }
    );
};

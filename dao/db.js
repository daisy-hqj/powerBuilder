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

    var pageSize = 30;

    var whereStr = 'WHERE occasion = ?';
    var sqlStr = 'SELECT id, url, size, name, ctime, start, end, occasion from resource';
    var sqlParams = [params.occasion];

    if (params.occasion === 'activities') {
        whereStr += ' AND start <= ? AND end >= ?';
        
        var today = moment().format('YYYY-MM-DD');
        sqlParams.push(today, today);
    }

    whereStr += ' ORDER BY ? ? LIMIT ?,?';
    sqlParams.push(params.sortby, params.orderby, (params.page - 1) * pageSize, pageSize);

	connection.query(
        {
            sql: 'SELECT id, url, size, name, ctime, start, end, occasion from resource ' + whereStr,
            values: sqlParams
        },
        function(err, result, fields) {
		    if (err) {
		        console.error('error connecting: ' + err);
                connection.end();
		        return false;
		    }

            connection.query(
                {
                    sql: 'SELECT count(*) as count from resource ' + whereStr,
                    values: sqlParams
                },
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

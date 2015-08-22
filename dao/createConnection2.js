var mysql      = require('mysql');
var evconf = require('../conf/dev').dbConf;//开发环境配置
var connection = mysql.createConnection(evconf);


exports.pullWithin = function (callback) {

	connection.connect();

	var today = new Date().getTime();
	connection.query(
        "SELECT id,url,size,name from resource where start<" + today + " and end>" + today + " ORDER BY size",
        function(err, rows, fields) {
		    if (err) {
		        console.error('error connecting: ' + err);
		        return false;
		    }
		    connection.end();
		    callback(rows);
		}
    );
}











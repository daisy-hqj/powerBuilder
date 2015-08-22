var mysql      = require('mysql');
var evconf = require('../conf/main').dbConf;//开发环境配置
var connection = mysql.createConnection(evconf);

exports.push = function (table, size, start, end, callback) {

	var size = size || 0;

	connection.connect();
	 
	connection.query("INSERT INTO resource (url,size,name,ctime,start,end,occasion) VALUES ('"+table.url+"', "+ size +", 'dsfasdasasd', '"
		+table.name+"', '"+table.start+"', "+start+", "+end+", '"+table.occasion+"') ", function(err, rows, fields) {
		if (err) {
		    console.error('error connecting: ' + err);
		    return false;
		  }

	  	connection.query('SELECT * from resource', function(err, rows, fields) {
		if (err) {
		    console.error('error connecting: ' + err);
		    return false;
		  }
		  connection.end();
		  callback(rows);
		});

	});
	//connection.end();
}










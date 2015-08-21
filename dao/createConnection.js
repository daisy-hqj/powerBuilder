var mysql      = require('mysql');
var evconf = require('../conf/dev').dbConf;//开发环境配置
var connection = mysql.createConnection(evconf);

exports.connect = function (table, size) {

	var size = size || 0;

	connection.connect();
	 
	connection.query("INSERT INTO resource (url,size,uid,name,ctime,start,end,occasion) VALUES ('"+table.url+"', "+ size +", 'dsfasdasasd', '"
		+table.name+"', '"+table.start+"', '"+table.start+"', '"+table.end+"', '"+table.occasion+"') ", function(err, rows, fields) {
		if (err) {
		    console.error('error connecting: ' + err);
		    return false;
		  }

	  	connection.query('SELECT * from resource', function(err, rows, fields) {
		if (err) {
		    console.error('error connecting: ' + err);
		    return false;
		  }
		  console.log(rows[0]);
		  connection.end();
		  return rows;
		});

	});
	 
	//connection.end();

}
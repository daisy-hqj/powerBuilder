var mysql      = require('mysql');
var evconf = require('../conf/dev').dbConf;//开发环境配置
var connection = mysql.createConnection(evconf);

exports.push = function (table, size, start, end) {

	var size = size || 0;

	connection.connect();
	 
	connection.query("INSERT INTO resource (url,size,uid,name,ctime,start,end,occasion) VALUES ('"+table.url+"', "+ size +", 'dsfasdasasd', '"
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
		  console.log(rows[0]);
		  connection.end();
		  return rows;
		});

	});
	//connection.end();
}

exports.pullWithin = function () {

	connection.connect();

	var today = new Date().getTime();
	 
	connection.query("SELECT * from resource where start<"+today+" and end>"+today, function(err, rows, fields) {
		if (err) {
		    console.error('error connecting: ' + err);
		    return false;
		  }
		  connection.end();
		  return rows;
		});

	});
	//connection.end();
}
var mysql      = require('mysql');
var evconf = require('../conf/dev').dbConf;//开发环境配置
var connection = mysql.createConnection(evconf);

exports.connect = function (table) {
	console.log(table);
	console.log("ddd")

	connection.connect();
	 
	connection.query('INSERT INTO resource VALUES ('+table.url+', 0'+table.name+', '+table.start+','+table.start+','+table.end+') ', function(err, rows, fields) {
		if (err) {
		    console.error('error connecting: ' + err);
		    return;
		  }
		console.log(rows[0]);

	  	connection.query('SELECT * from resource', function(err, rows, fields) {
		if (err) {
		    console.error('error connecting: ' + err);
		    return;
		  }
		 
		  console.log(rows[0]);
		});

	});
	 
	connection.end();

}
var mysql      = require('mysql');
var evconf = require('../conf/main').dbConf;//开发环境配置

exports.push = function (data, size, start, end, callback) {

    var connection = mysql.createConnection(evconf);
	var size = size || 0;

	connection.connect();

    var inserts = {
        url: data.url,
        size: size,
        uid: 'asfasdfaf',
        name: data.name,
        start: data.start + '',
        end: data.end + '',
        occasion: data.occasion
    };

	connection.query("INSERT INTO resource SET ?", inserts, function(err, rows, fields) {
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

exports.pullWithin = function (callback) {

    var connection = mysql.createConnection(evconf);
	connection.connect();

	var today = new Date().getTime();
	connection.query(
        "SELECT url,size,uid,name from resource where start<" + today + " and end>" + today + " ORDER BY size",
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

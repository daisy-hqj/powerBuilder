var exp = require('express');
var bodyParser = require('body-parser');
var createConnection = require('./dao/createConnection').connect;
var path = require('path');
var download = require('./src/download').downloadSingleFile;

var app = exp();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.set('views',  __dirname + '/template');
//模板引擎
app.set('view engine', 'ejs');
//渲染文件
app.get('/', function(req, res){
    res.render('global');
});
//表单路径
app.post('/submit', function(req, res){
    res.render('global');
    //下载资源
    download(req.body.url)
    createConnection(req.body)
});
//静态资源
app.use(exp.static(__dirname + '/static'));

//下载
function download(url) {
	var buildDir = path.join(__dirname, '_build');

	download(url,buildDir).then(
	    function (file) {
	    	console.log('download');
	    	console.log(file);
	    },
	    function () {
	        console.log('download failed');
	    }
	);
}

if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
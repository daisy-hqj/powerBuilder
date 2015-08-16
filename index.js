var exp = require('express');
var bodyParser = require('body-parser');

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
    console.log(req.body);
});
//静态资源
app.use(exp.static(__dirname + '/static'));

if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
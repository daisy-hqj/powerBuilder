var exp = require('express');
var bodyParser = require('body-parser');

var index = require('./controllers/index');
var list = require('./controllers/list');
var build = require('./controllers/build');

var app = exp();

//支持form表单在action里面取post的数据
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// 模板目录
app.set('views',  __dirname + '/views');

// 模板引擎
app.set('view engine', 'ejs');

//服务器给静态资源加路由
app.use(exp.static(__dirname + '/static'));

app.use('/_build', exp.static(__dirname + '/_build'));

app.get('/', index.show);
app.post('/index/submit', index.submit)
app.get('/list', list.show);
app.get('/build', build.build);

if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}

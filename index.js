var exp = require('express');
var bodyParser = require('body-parser');

var index = require('./controllers/index');
var list = require('./controllers/list');

var app = exp();

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// 模板目录
app.set('views',  __dirname + '/views');

// 模板引擎
app.set('view engine', 'ejs');

//静态资源
app.use(exp.static(__dirname + '/static'));

app.get('/', index.show);
app.post('/index/submit', index.submit)
app.get('/list', list.show);

if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}

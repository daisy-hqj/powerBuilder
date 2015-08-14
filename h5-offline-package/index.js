var exp = require('express');

var app = exp();

app.set('views',  __dirname + '/template');
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('global');
});

if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
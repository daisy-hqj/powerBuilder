var db = require('../dao/db');

exports.show = function (req, res) {
	//拉取数据
    db.pullWithin(function(withinList){
    	res.render('list', {list: withinList});
    });
    // var withinList = [{url:'http://www.taobao.com',size:3324,uid:'明几',name:'vsdaqde'},
    // 					{url:'http://www.taobao.com',size:3324,uid:'明几',name:'vsdaqde'},
    // 					{url:'http://www.taobao.com',size:3324,uid:'明几',name:'vsdaqde'}
    // 					];//拉取数据
};

var db = require('../dao/db');

exports.show = function (req, res) {
	//拉取数据
    db.pullWithin(function(withinList){
    	//res.render('list', {list: withinList});
        res.render('list', {
            occasion: global,
            page: 1,
            total: 20,
            sortby: size,
            orderby: desc,
            list: [
                {
                    url: 'http://bcscdn.baidu.com/resource/c5f3393d1fe4260d9c9a3ebd952d1570.jpg',
                    size: 68633,
                    name: 'aaaa',
                    ctime: '2015-08-22 21:51:24'
                }
            ]
        });
    });
};

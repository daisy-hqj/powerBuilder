var db = require('../dao/db');

exports.show = function (req, res) {
    var query = req.query || {};

    query.page = query.page || 1;
    query.sortby = query.sortby || 'ctime';
    query.orderby = query.orderby || 'desc';
    query.occasion = query.occasion || 'global';

	//拉取数据
    db.queryList(query || {}, function(data){
    	res.render('list', {
            occasion: query.occasion,
            page: query.page,
            total: Math.ceil(data.count / 10000),
            sortby: query.sortby,
            orderby: query.orderby,
            list: data.list
        });
    });
};

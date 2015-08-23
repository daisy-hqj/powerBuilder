var db = require('../dao/db');

exports.show = function (req, res) {
    var query = req.query || {};

    query.page = query.page || 1;
    query.sortby = query.sortby || 'ctime';
    query.orderby = query.orderby || 'desc';
    query.occasion = query.occasion || 'global';

	//拉取数据
    db.queryList(query || {}, function(data){
        data = data || [];

        var count;

        if (!data.length) {
            count = 0;
        }
        else {
            count = data[0].count;
        }

    	res.render('list', {
            occasion: query.occasion,
            page: query.page,
            total: Math.ceil(count / 30),
            sortby: query.sortby,
            orderby: query.orderby,
            list: data
        });
        console.log(data)
    });
};

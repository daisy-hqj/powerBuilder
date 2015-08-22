var db = require('../dao/db');

exports.show = function (req, res) {
	//拉取数据
    db.pullWithin(function(withinList){
    	res.render('list', {list: withinList});
    });
};

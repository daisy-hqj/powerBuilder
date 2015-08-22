var createConnection = require('../dao/createConnection2');

exports.show = function (req, res) {
	//拉取数据
    createConnection.pullWithin(function(withinList){
    	res.render('list', {list: withinList});
    });
};

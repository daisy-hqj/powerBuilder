var db = require('../dao/db');

exports.show = function (req, res) {
    var withinList = db.pullWithin();//拉取数据

    res.render('list', {list: withinList});
};

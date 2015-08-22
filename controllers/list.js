var createConnection = require('../dao/createConnection');

exports.show = function (req, res) {
    var withinList = createConnection.pullWithin();//拉取数据

    res.render('list', {list: withinList});
};

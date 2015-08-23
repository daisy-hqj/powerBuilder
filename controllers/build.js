exports.build = function (req, res) {
    var query = req.query;
    query.ids = query.ids || '';

    var arr = query.ids.split(',');
    res.end('build');
};

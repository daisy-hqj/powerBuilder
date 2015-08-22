var path = require('path');

module.exports = {
	dbConf: {
		  host     : 'localhost',
		  user     : 'root',
		  //password : 'secret',
		  database : 'h5_offline_build'

	},
    buildConf: {
        dir: path.join(__dirname, '../_build'),
        fileMaxSize: 100 * 1000
    }
}

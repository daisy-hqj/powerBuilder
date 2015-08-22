var downloadFile = require('../lib/download').downloadSingleFile;
var createConnection = require('../dao/createConnection').connect;

exports.show = function (req, res) {
    res.render('global');
};

exports.submit = function () {
    res.render('list');
    var timeChecked = true;

    if(req.body.occasion == "activities") {
    	//校验时间
    	timeChecked = checkFile(req.body);
    }
	if(timeChecked) {
    	//下载文件 校验大小
		download(req.body);
    }
};

//下载
function download(data) {
	var buildDir = path.join(__dirname, '_build');
	console.log(buildDir);

	downloadFile(data.url, buildDir).then(
	    function (file) {
	    	console.log('downloaded');

	    	var size = file[0].length;
			console.log(size);//资源大小
			//限制大小
			if(size > 10000) {
				console.log('size overflow');
				return;
			}
			var list = createConnection(data, size);//存储数据
			console.log(list)
			if(list){
				console.log("list:");
				console.log(list);
			}
	    },
	    function () {
	        console.log('download failed');
	    }
	);
}

function checkFile(data) {
	//限制时间
	if(!data.start) {
		console.log('startTime null');
		return false;
	}
	if(!data.end) {
		console.log('endTime null');
		return false;
	}
	var startTime =Date.parse(data.start.replace(/-/g,"/"));
	var endTime = Date.parse(data.end.replace(/-/g,"/"));
	if(endTime - startTime > 604800000) {//7天周期
		console.log('time overflow');
		return false;
	}
	if(endTime - startTime < 0) {//上线时间小于0
		console.log('time wrong');
		return false;
	}
	return true;
}

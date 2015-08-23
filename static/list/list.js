(function () {
	function init() {
		$('#listGlobalResource').on('click', function () {
			$('#listGlobalResource').addClass('active');
			$('#listActivitiesResource').removeClass('active');
		});
		$('#listActivitiesResource').on('click', function () {
			$('#listActivitiesResource').addClass('active');
			$('#listGlobalResource').removeClass('active');
		});
		if ($('#submit')) {
			$('#submit').on('click', function () {
				var idArr = [];
				$('.availability').each(function () {
					if ($(this)[0].checked) {
						idArr.push($(this).attr('data-id'))
					}
				})
				var a=confirm("被打包资源的序号如下："+idArr.join(','));
				if (a==true){
					window.open('/build?ids=' + idArr.join(','));
				}
			})
		}
	}
	init();
}) ()
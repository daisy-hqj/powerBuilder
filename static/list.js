(function () {
	function init() {
		$('#listGlobalResource').on('click', function () {
			$('#listGlobalResource').addClass('active');
			$('#listActivitiesResource').removeClass('active');
		})
		$('#listActivitiesResource').on('click', function () {
			$('#listActivitiesResource').addClass('active');
			$('#listGlobalResource').removeClass('active');
		})
	}
	init();
}) ()
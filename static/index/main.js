(function () {

    function init() {
        $('#resourceRadio').on('click', function () {
            if ($('#globalResource')[0].checked) {
                $('#startTime').hide();
                $('#endTime').hide();
            }
            else {
                $('#startTime').show();
                $('#endTime').show();
            }
        });
    }

    init();
}) ();

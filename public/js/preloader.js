$(window).on('load', function () {
    var $preloader = $('#page-preloader'), $spinner   = $preloader.find('.spinner');
    $spinner.fadeOut();
    $preloader.delay(150).fadeOut('slow');
});
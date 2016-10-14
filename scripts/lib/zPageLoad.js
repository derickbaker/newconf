$(window).load(function() { // makes sure the whole site is loaded

    "use strict";

    document.body.className += ' loaded'
    
    $('#preloader').delay(400).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('#preloader .inner').fadeOut(); // will first fade out the loading animation

    //var wow = new WOW({
        //offset:100,        // distance to the element when triggering the animation (default is 0)
        //mobile:false       // trigger animations on mobile devices (default is true)
    //});
    //wow.init();

    //svg4everybody();

    //var mySVGsToInject = document.querySelectorAll('img.svgSwap');

   // Trigger the injection
    //SVGInjector(mySVGsToInject, {
      //pngFallback: '../images/pngfallbacks'
    //});

})

$(document).ready(function() {
    $('.menu-link').bigSlide({
        menu: '#fullMenu',
        side: 'right',
        menuWidth: '18.750em',
        easyClose: 'true'
    });

    $('.item-has-children').children('a').on('click', function(event){
        event.preventDefault();
        $(this).toggleClass('submenu-open').next('.submenu').slideToggle(200).end().parent('.item-has-children').siblings('.item-has-children').children('a').removeClass('submenu-open').next('.submenu').slideUp(200);
    });

    $('#navigation').affix({
        offset: {top: $('header').height() + 250}
    }).on('affix.bs.affix', function () {
        $('body').addClass("nav-sticky-active nav-sticky-open");
    }).on('affix-top.bs.affix', function () {
        $('body').removeClass("nav-sticky-active nav-sticky-open");
    });

});
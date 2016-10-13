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

    var mySVGsToInject = document.querySelectorAll('img.swap');

   // Trigger the injection
    SVGInjector(mySVGsToInject, {
      pngFallback: '../images/pngfallbacks'
    });

})

$(document).ready(function() {
    $('.menu-link').bigSlide({
        menu: '#fullMenu',
        side: 'right',
        menuWidth: '18.750em',
        easyClose: 'true'
    });

    $('.js-accordion-trigger').bind('click', function(e){
      jQuery(this).parent().find('.submenu').slideToggle('fast'); 
     // apply the toggle to the ul
      jQuery(this).parent().toggleClass('is-expanded');
      e.preventDefault();
    });

    $('#navigation').affix({
        offset: {top: $('header').height() + 250}
    }).on('affix.bs.affix', function () {
        $('body').addClass("nav-sticky-active nav-sticky-open");
    }).on('affix-top.bs.affix', function () {
        $('body').removeClass("nav-sticky-active nav-sticky-open");
    });

});
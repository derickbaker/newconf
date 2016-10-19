$(window).load(function() { // makes sure the whole site is loaded

    "use strict";

    document.body.className += ' loaded'
    
    //$('#preloader').delay(400).fadeOut('slow'); // will fade out the white DIV that covers the website.
    //$('#preloader .inner').fadeOut(); // will first fade out the loading animation

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
    
    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 1500,
        outDuration: 800,
        linkElement: '.animsition-link',
        // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
        loading: true,
        loadingParentElement: 'body', //animsition wrapper element
        loadingClass: 'animsition-loading',
        loadingInner: '', // e.g '<img src="loading.svg" />'
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: [ 'animation-duration', '-webkit-animation-duration'],
        // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
        // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
        overlay : false,
        overlayClass : 'animsition-overlay-slide',
        overlayParentElement : 'body',
        transition: function(url){ window.location.href = url; }
  });

    $('.menu-link').bigSlide({
        menu: '#fullMenu',
        side: 'right',
        menuWidth: '18.750em',
        easyClose: 'true'
    });

    $('.dropdown').on('mouseenter mouseleave click tap', function() {
        $(this).toggleClass("open");
    });
    

    $('.item-has-children').children('a').on('click', function(event){
        event.preventDefault();
        $(this).toggleClass('submenu-open').next('.submenu').slideToggle(200).end().parent('.item-has-children').siblings('.item-has-children').children('a').removeClass('submenu-open').next('.submenu').slideUp(200);
    });

    $('#navigation').affix({
        offset: {top: $('header').height() + 80}
    }).on('affix.bs.affix', function () {
        $('body').addClass("nav-sticky-active nav-sticky-open");
    }).on('affix-top.bs.affix', function () {
        $('body').removeClass("nav-sticky-active nav-sticky-open");
    });

});
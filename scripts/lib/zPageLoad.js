$(window).load(function() { // makes sure the whole site is loaded

    "use strict";

    document.body.className += ' loaded'

    //var wow = new WOW({
        //offset:100,        // distance to the element when triggering the animation (default is 0)
        //mobile:false       // trigger animations on mobile devices (default is true)
    //});
    //wow.init();

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

    /*$('.menu-link').bigSlide({
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
    });*/

    $('#header').affix({
        offset: {top: $('header').height() + 120}
    }).on('affix.bs.affix', function () {
        $('body').addClass("fixed-nav-active");
    }).on('affix-top.bs.affix', function () {
        $('body').removeClass("fixed-nav-active");
    });


retinajs();


    //if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
    var MqL = 1170;
    //move nav element position according to window width
    moveNavigation();
    $(window).on('resize', function(){
        (!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
    });

    //mobile - open lateral menu clicking on the menu icon
    $('.nav-trigger').on('click', function(event){
        event.preventDefault();
        if( $('.main-content').hasClass('nav-is-visible') ) {
            closeNav();
            $('.overlay').removeClass('is-visible');
        } else {
            $(this).addClass('nav-is-visible');
            $('body').addClass('nav-is-visible');
            $('.primary-nav').addClass('nav-is-visible');
            $('.main-header').addClass('nav-is-visible');
            $('.main-content').addClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                $('body').addClass('overflow-hidden');
            });
            toggleSearch('close');
            $('.overlay').addClass('is-visible');
        }
    });

    //open search form
    $('.search-trigger').on('click', function(event){
        event.preventDefault();
        toggleSearch();
        closeNav();
    });

    //close lateral menu on mobile 
    $('.overlay').on('swiperight', function(){
        if($('.primary-nav').hasClass('nav-is-visible')) {
            closeNav();
            $('.overlay').removeClass('is-visible');
        }
    });
    $('.nav-on-left .overlay').on('swipeleft', function(){
        if($('.primary-nav').hasClass('nav-is-visible')) {
            closeNav();
            $('.overlay').removeClass('is-visible');
        }
    });
    $('.overlay').on('click', function(){
        closeNav();
        toggleSearch('close')
        $('.overlay').removeClass('is-visible');
    });


    //prevent default clicking on direct children of .primary-nav 
    $('.primary-nav').children('.has-children').children('a').on('click', function(event){
        event.preventDefault();
    });
    //open submenu
    $('.has-children').children('a').on('click', function(event){
        if( !checkWindowWidth() ) event.preventDefault();
        var selected = $(this);
        if( selected.next('ul').hasClass('is-hidden') ) {
            //desktop version only
            selected.addClass('selected').next('ul').removeClass('is-hidden').end().parent('.has-children').parent('ul').addClass('moves-out');
            selected.parent('.has-children').siblings('.has-children').children('ul').addClass('is-hidden').end().children('a').removeClass('selected');
            $('.overlay').addClass('is-visible');
            $('body').addClass('nav-is-visible');
        } else {
            selected.removeClass('selected').next('ul').addClass('is-hidden').end().parent('.has-children').parent('ul').removeClass('moves-out');
            $('.overlay').removeClass('is-visible');
            $('body').removeClass('nav-is-visible');
        }
        toggleSearch('close');
    });

    //submenu items - go back link
    $('.go-back').on('click', function(){
        $(this).parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('moves-out');
    });

    function closeNav() {
        $('body').removeClass('nav-is-visible');
        $('.nav-trigger').removeClass('nav-is-visible');
        $('.main-header').removeClass('nav-is-visible');
        $('.primary-nav').removeClass('nav-is-visible');
        $('.has-children ul').addClass('is-hidden');
        $('.has-children a').removeClass('selected');
        $('.moves-out').removeClass('moves-out');
        $('.main-content').removeClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
            $('body').removeClass('overflow-hidden');
        });
    }

    function toggleSearch(type) {
        if(type=="close") {
            //close serach 
            $('.search').removeClass('is-visible');
            $('.search-trigger').removeClass('search-is-visible');
            $('.overlay').removeClass('search-is-visible');
        } else {
            //toggle search visibility
            $('.search').toggleClass('is-visible');
            $('.search-trigger').toggleClass('search-is-visible');
            $('.overlay').toggleClass('search-is-visible');
            if($(window).width() > MqL && $('.search').hasClass('is-visible')) $('.search').find('input[type="search"]').focus();
            ($('.search').hasClass('is-visible')) ? $('.overlay').addClass('is-visible') : $('.overlay').removeClass('is-visible') ;
        }
    }

    function checkWindowWidth() {
        //check window width (scrollbar included)
        var e = window, 
            a = 'inner';
        if (!('innerWidth' in window )) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        if ( e[ a+'Width' ] >= MqL ) {
            return true;
        } else {
            return false;
        }
    }

    function moveNavigation(){
        var navigation = $('.conf-nav');
        var desktop = checkWindowWidth();
        if ( desktop ) {
            navigation.detach();
            navigation.insertBefore('.header-buttons');
        } else {
            navigation.detach();
            navigation.insertAfter('.main-content');
        }
    }
});

jQuery(document).ready(function($){
    //open/close mega-navigation
    $('.hec-dropdown-trigger').on('click', function(event){
        event.preventDefault();
        toggleNav();
    });

    //close meganavigation
    $('.hec-dropdown .hec-close').on('click', function(event){
        event.preventDefault();
        toggleNav();
    });

    //on mobile - open submenu
    $('.hec-has-children').children('a').on('click', function(event){
        //prevent default clicking on direct children of .has-children 
        event.preventDefault();
        var selected = $(this);
        selected.next('ul').removeClass('is-hidden').end().parent('.hec-has-children').parent('ul').addClass('move-out');
    });

    //on desktop - differentiate between a user trying to hover over a dropdown item vs trying to navigate into a submenu's contents
    var submenuDirection = ( !$('.hec-dropdown-wrapper').hasClass('open-to-left') ) ? 'right' : 'left';
    $('.hec-dropdown-content').menuAim({
        activate: function(row) {
            $(row).children().addClass('is-active').removeClass('fade-out');
            if( $('.hec-dropdown-content .fade-in').length == 0 ) $(row).children('ul').addClass('fade-in');
        },
        deactivate: function(row) {
            $(row).children().removeClass('is-active');
            if( $('li.hec-has-children:hover').length == 0 || $('li.hec-has-children:hover').is($(row)) ) {
                $('.hec-dropdown-content').find('.fade-in').removeClass('fade-in');
                $(row).children('ul').addClass('fade-out')
            }
        },
        exitMenu: function() {
            $('.hec-dropdown-content').find('.is-active').removeClass('is-active');
            return true;
        },
        submenuDirection: submenuDirection,
    });

    //submenu items - go back link
    $('.hec-go-back').on('click', function(){
        var selected = $(this),
            visibleNav = $(this).parent('ul').parent('.hec-has-children').parent('ul');
        selected.parent('ul').addClass('is-hidden').parent('.hec-has-children').parent('ul').removeClass('move-out');
    }); 

    function toggleNav(){
        var navIsVisible = ( !$('.hec-dropdown').hasClass('dropdown-is-active') ) ? true : false;
        $('.hec-dropdown').toggleClass('dropdown-is-active', navIsVisible);
        $('.hec-dropdown-trigger').toggleClass('dropdown-is-active', navIsVisible);
        if( !navIsVisible ) {
            $('.hec-dropdown').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
                $('.hec-has-children ul').addClass('is-hidden');
                $('.move-out').removeClass('move-out');
                $('.is-active').removeClass('is-active');
            }); 
        }
    }

    //IE9 placeholder fallback
    //credits http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
    if(!Modernizr.input.placeholder){
        $('[placeholder]').focus(function() {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
            }
        }).blur(function() {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.val(input.attr('placeholder'));
            }
        }).blur();
        $('[placeholder]').parents('form').submit(function() {
            $(this).find('[placeholder]').each(function() {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                }
            })
        });
    }
});
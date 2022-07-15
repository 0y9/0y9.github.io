! function($) {
    "use strict";

    $(window).on('load', function() {
        $('#preloader').addClass("loaded");
    });
    
    $('.navbar-links a').on('click', function() {
        setTimeout(function() {
            $(".navbar-collapse").removeClass('open');
            $(".ham").removeClass('active');
            $(".navbar-toggler").addClass('collapsed');
            $("body, html").toggleClass('overflow-hidden');
            $("body").toggleClass('aside-open');
        }, 300);
        
    });

    $('.navbar-toggler').on('click', function(){
        $(this).toggleClass('collapsed');
        $(".navbar-collapse").toggleClass('open');
        $(".ham").toggleClass('active');
        $("body, html").toggleClass('overflow-hidden');
        $("body").toggleClass('aside-open');
    });

    $("#navbarCollapse").scrollspy({
        offset:20
    });

    $('.simple-ajax-popup').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-fade',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        },
        zoom: {
            enabled: true,

            duration: 300,
            easing: 'ease-in-out',

            opener: function(openerElement) {
                return openerElement.is('img') ? openerElement : openerElement.find('img');
            }
        }
    });

    var swipertest = new Swiper('.swiper-testimony', {
        spaceBetween: 30,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    var wow = new WOW(
      {
        boxClass:     'wow',
        animateClass: 'animated',
        offset:       0,
        mobile:       true,
        live:         true,
        callback:     function(box) {
          // the callback is fired every time an animation is started
          // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: null,
        resetAnimation: true,
      }
    );
    wow.init();

    var windowWidth = $(window).width();

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $(".mobileView").hide();
    }

    if(windowWidth >= 769) {
 
        $('#pagepiling').pagepiling({
            menu: null,
            direction: 'vertical',
            verticalCentered: true,
            sectionsColor: [],
            anchors: [
                'HOME', 
                'ABOUT', 
                'SERVICES',
                'RESUME', 
                'TESTIMONY', 
                'CONTACT'
            ],
            scrollingSpeed: 500,
            easing: 'swing',
            loopBottom: true,
            loopTop: false,
            css3: true,
            navigation: {
                'textColor': '#000',
                'bulletsColor': '#fff',
                'position': 'right',
                'tooltips': [
                    'HOME', 
                    'ABOUT', 
                    'SERVICES', 
                    'RESUME',
                    'TESTIMONY', 
                    'CONTACT'
                ]
            },
            normalScrollElements: null,
            normalScrollElementTouchThreshold: 5,
            touchSensitivity: 1,
            keyboardScrolling: true,
            sectionSelector: '.section',
            animateAnchor: true,

            //events
            onLeave: function(index, nextIndex, direction){},
            afterLoad: function(anchorLink, index){},
            afterRender: function(){},
        });
    }

    $('#autoplay').textition({
        speed: 1.5,
        animation: 'ease-out',
        map: {x: 200, y: 100, z: 0},
        autoplay: true,
        interval: 3
    });

    function mousecursor() {
        if ($("body")) {
            const e = document.querySelector(".cursor-inner"),
                t = document.querySelector(".cursor-outer");
            let n, i = 0,
                o = !1;
            window.onmousemove = function (s) {
                o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)", n = s.clientY, i = s.clientX
            }, $("body").on("mouseenter", "a, .cursor-pointer", function () {
                e.classList.add("cursor-hover"), t.classList.add("cursor-hover")
            }), $("body").on("mouseleave", "a, .cursor-pointer", function () {
                $(this).is("a") && $(this).closest(".cursor-pointer").length || (e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover"))
            }), e.style.visibility = "visible", t.style.visibility = "visible"
        }
    };

    mousecursor();

}(window.jQuery);

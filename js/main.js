// var $ = jQuery;
// var QueryString = function() {
//     var query_string = {};
//     var query = window.location.search.substring(1);
//     var vars = query.split("&");
//     for (var i = 0; i < vars.length; i++) {
//         var pair = vars[i].split("=");
//         if (typeof query_string[pair[0]] === "undefined") {
//             query_string[pair[0]] = decodeURIComponent(pair[1]);
//         } else if (typeof query_string[pair[0]] === "string") {
//             var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
//             query_string[pair[0]] = arr;
//         } else {
//             query_string[pair[0]].push(decodeURIComponent(pair[1]));
//         }
//     }
//     return query_string;
// }();


(function() {
    $(document).ready(function() {
        initSliders()
        initMap();
        initFloatHeader();
        initTabs('.tab-control');
        initMobileMenu();
        initTabs('.js-tabs');
        initTabs('.js-tabs-zindex', 'z');
        // initTabs('.tab-control');
        //$('#main-room-slider').slick()
    });
})()


function isMobile() {
    return window.innerWidth < 1200;
}


function initFloatHeader() {
    var $header = $('.main-header'),
        rightSize = ($(window).width() > 991);

    setHeaderState();

    $(window).scroll(setHeaderState);

    $(window).resize(resizeHandler);

    function setHeaderState() {
        if ($(window).scrollTop() == 0 || !rightSize) {
            $header.removeClass('scrolling-header');
        } else {
            $header.addClass('scrolling-header');
        }
    }

    function resizeHandler() {
        rightSize = $(window).width() > 991 ? true : false;
        setHeaderState();
    }
}

function initTabs(selector, zIndexMode) {
    /*
    <ul class="tabs" data-area=".tab-content">
        <li><span data-tab-selector=".shutle-bus">111</span></li>
        <li><span data-tab-selector=".taxi">222</span></li>
    </ul>
    <div class="shutle-bus tab-content"></div>
    <div class="taxi tab-content"></div>
    */
    var $tabControl = $(selector),
        zIndexMode = (zIndexMode === 'z') ? true : false;

    if (!$tabControl.length) {
        return false;
    }


    var $tabContainer = $(selector),
        targetArea = $tabContainer.attr('data-area'),
        $tabs = $tabContainer.find('.tab-item>*'),
        $targets,
        $activeTab;

    if ($tabs.length === 1) {
        $tabContainer.addClass('only-one-tab');
        return false;
    }


    $tabs.each(function() {
        var $target = $($(this).attr('data-tab-selector')).filter(targetArea);
        $targets = ($targets === undefined) ? $target : $targets.add($target);

        if ($target.length) {
            $(this).click(function(e) {
                e.preventDefault();
                if (!$(this).hasClass('active')) {

                    hide($targets);
                    show($target);
                    $tabs.removeClass('active');
                    $(this).addClass('active');
                }
            })
        }
    })

    if (zIndexMode) {
        $targets.eq(0).parent().css('position', 'relative')
    }

    hide($targets);

    $activeTab = $tabs.filter('.active');

    if ($activeTab.length === 1) {
        $targets.filter($activeTab.href()).show();
    } else {
        $tabs.eq(0).click();
    }



    function hide($el) {
        if (zIndexMode) {
            $el.css({
                'z-index': '-100',
                'position': 'absolute'
            })
        } else {
            $el.hide()
        }
    }

    function show($el) {
        if (zIndexMode) {
            $el.css({
                'z-index': '1',
                'position': 'static'
            })
        } else {
            $el.show()
        }
    }
}


function initSliders() {


    initGallerySliders();
    initRoomSliders();



    $('#line-slider').slick({
        slidesToShow: 3,
        prevArrow: '<button type="button" class="standart-arrow slick-prev"></button>',
        nextArrow: '<button type="button" class=" standart-arrow slick-next"></button>',
        responsive: [{
            breakpoint: 1199,
            settings: {
                slidesToShow: 2,
            }
        }, {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
            }
        }]
    });


}

function initRoomSliders() {
    var $mainSlider = $('.main-room-slider'),
        $navSlider = $('.nav-room-slider'),
        $roomItems = $('.product-card');

    if ($navSlider.length < 1 || $mainSlider.length < 1) {
        return false;
    }

    $mainSlider.slick({
        fade: true,
        arrows: false,
        swipe: false,
    })
    $navSlider.slick({
        slidesToShow: 4,
        prevArrow: '<button type="button" class="standart-arrow slick-prev"></button>',
        nextArrow: '<button type="button" class=" standart-arrow slick-next"></button>',
        responsive: [{
            breakpoint: 1199,
            settings: {
                slidesToShow: 3,
            }
        }, {
            breakpoint: 991,
            settings: {
                slidesToShow: 4,
            }
        }, {
            breakpoint: 601,
            settings: {
                slidesToShow: 3,
            }
        }]
    })

    $navSlider.find('.room-slide').click(function() {
        $mainSlider.slick('slickGoTo', $(this).attr('data-slick-index'));
    })

    if ($roomItems.length < 1) {
        return false;
    }

    $roomItems.click(function(e) {
        if (!$(this).hasClass('active')) {

            var filter = $(this).attr('data-filter');

            e.preventDefault();
            $roomItems.removeClass('active');
            $(this).addClass('active');

            $mainSlider.slick('slickUnfilter');
            $navSlider.slick('slickUnfilter');
            $mainSlider.slick('slickFilter', filter);
            $navSlider.slick('slickFilter', filter);
        }
    })

    $roomItems.eq(0).click();
}

function initGallerySliders() {
    $gallerySliderList = $('.gallery-slider');
    $gallerySliderList.each(function() {
        $(this).magnificPopup({
            type: 'image',
            delegate: '.gallery-slide',
            gallery: {
                enabled: true,
                arrowMarkup: '<button title="%title%" type="button" class="alt-arrow alt-arrow-%dir%"></button>'
            }
        });
    })
    $gallerySliderList.slick({
        rows: 2,
        slidesPerRow: 4,
        infinite: false,
        prevArrow: '<button type="button" class="alt-arrow alt-arrow-prev"></button>',
        nextArrow: '<button type="button" class="alt-arrow alt-arrow-next"></button>',

        responsive: [{
            breakpoint: 1199,
            settings: {
                slidesPerRow: 3,
            }
        }, {
            breakpoint: 500,
            settings: {
                slidesPerRow: 2,
            }
        }]
    })
}

function initMap() {
    if ($("#map").length) {
        $(document).ready(function() {
            var map = new lazyMap(globalMapSettings);
        })
    }
}

function initMobileMenu() {
    var $mobileButton = $('#mobile-button');
    var $mainMenu = $('.main-menu');
    var $menuWrapper = $('.menu-wrapper');

    $mobileButton.click(function() {
        $(this).toggleClass('opened');
        $('body').toggleClass('overflow-hidden');
        $menuWrapper.stop().fadeToggle();
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest('#mobile-button').length && $(window).width() < 991) {
            $menuWrapper.fadeOut(300);
            $mobileButton.removeClass('opened');
            $('body').removeClass('overflow-hidden');
        }
        e.stopPropagation();
    });

    $(window).resize(function() {
        if ($(window).width() > 991) {
            $menuWrapper.removeAttr('style');
            if ($mobileButton.hasClass('opened')) {
                $mobileButton.removeClass('opened');

            }
        }
    });
}
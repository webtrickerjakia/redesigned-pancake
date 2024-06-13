(function ($) {
    $(function () {
        // Start Home Js
        $('.hamburger').click(function () {
            $("body").toggleClass("navShown");
            $(".nav-wrap").fadeToggle()
        });

        var header = new Headroom(document.querySelector('header'), {
            tolarence: 80,
            offset: 155,
            classes: {

                initial: 'headroom',
                pinned: 'slidedown',
                unpinned: 'slideup'
            }
        });
        header.init();

        $(window).scroll(function () {
            yPos = window.pageYOffset;
            scrollFade = yPos * 0.4 + 'px';
            $('.hero-inner').css({
                'transform': `translateY(${scrollFade})`
            })
            $(".hero-content").css("opacity", 1 - $(window).scrollTop() / 600);
        });

        if ($('div.cocktails-item-wrap').length) {
            $('div.cocktails-item-wrap').slick({
                dots: false,
                infinite: true,
                speed: 400,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 8000,
                arrows: true,
                centerMode: false,
                centerPadding: false,
                fade: true,
                responsive: [{
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                        },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,

                        }
                            },

                    {
                        breakpoint: 481,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                         }]
            }).slickAnimation();
        }

        if ($('.product-item-wrap').length) {
            var $slider = $('.product-item-wrap');
            $slider.slick({
                arrows: false,
                dots: false,
                infinite: false,
                slidesToShow: 3,
                centerMode: false,
                vertical: false,

                responsive: [
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 2,
                            swipe: true,
                            variableWidth: false,
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            variableWidth: false,
                            slidesToShow: 1,
                        }
                    },

                ]
            });

            $(window).on('resize', function () {
                $('.product-item-wrap').slick('resize');

            });
        }

        //Animate heading
        if ($('.split-heading').length) {
            var res = Splitting({
                target: '.split-heading',
                by: 'lines',
            });

            Splitting();

            res.forEach((splitResult) => {
                const wrappedLines = splitResult.lines.map((wordsArr) => `
            <span class="line"><span class="mask-up">
            ${wordsArr.map((word) => `${word.outerHTML}<span class="whitespace">
            </span>`).join('')}
            </span></span>`).join('');
                splitResult.el.innerHTML = wrappedLines;
            });
            inView.threshold(500);
            inView(".split-heading").on("enter", function (el) {
                if (!el.classList.contains("has-animated")) {
                    anime({
                        targets: el.querySelectorAll(".mask-up"),
                        translateY: ["100%", "0%"],
                        duration: 600,
                        delay: anime.stagger(200),
                        easing: "easeOutQuad",
                        autoplay: true
                    });
                    el.classList.add("has-animated");
                }
            });
        }
        
        // ANIMATION CHECK IF IN VIEW
        var $animation_elements = $('.anim-el');
        var $window = $(window);
        function check_if_in_view() {
            var window_height = $window.height();
            var insetAmount = window_height / 20 // fifth of the screen
            var window_top_position = $window.scrollTop();
            var window_bottom_position = (window_top_position + window_height) - insetAmount;
            $.each($animation_elements, function () {
                var $element = $(this);
                var element_height = $element.outerHeight();
                var element_top_position = $element.offset().top;
                var element_bottom_position = (element_top_position + element_height);
                //check to see if this current container is within viewport
                if (element_top_position <= window_bottom_position) {
                    $element.addClass('in-view');
                }
            });
        }
        $window.on('scroll orientationchange resize', check_if_in_view);
        $window.trigger('scroll');
        const updateProperties = (elem, state) => {
            elem.style.setProperty('--x', `${state.x}px`)
            elem.style.setProperty('--y', `${state.y}px`)
            elem.style.setProperty('--width', `${state.width}px`)
            elem.style.setProperty('--height', `${state.height}px`)
            elem.style.setProperty('--radius', state.radius)
            elem.style.setProperty('--scale', state.scale)
        }
        
        $('.side-nav ul li a, .our-range-item-content-btn a, .hero-btn a').click(function (e) {
            e.preventDefault();
            if ($(window).width() < 769) {

                $('body').removeClass('navShown')
                $('.nav-wrap').hide(100)
            }
            var target = $($(this).attr('href'));
            if (target.length) {
                var scrollTo = target.offset().top - 40;
                $('body, html').animate({
                    scrollTop: scrollTo + 'px'
                }, 800);
            }
        });
        
        
        
        $('.sponsor-content-btn a').click(function(e){
            e.preventDefault();
            $('body').addClass('where-to-buy-shown')
        })
        $('.order-crose-icon, body, .close-btn a').click(function(e){
            e.preventDefault();
            $('body').removeClass('where-to-buy-shown')
        })
        $('main').click(function(e){
            e.stopPropagation();
           
        })
        
        
        
        
        
        
        

    }) // End ready function.

    var mac = 0;
    if (navigator.userAgent.indexOf('Mac') > 0) {
        mac = 1;
    } else {
        mac = 0;
    }
    if (1 == mac) {
        $('body').addClass('mac-os');
    } else {
        $("body").addClass('win-os');
    }

})(jQuery)
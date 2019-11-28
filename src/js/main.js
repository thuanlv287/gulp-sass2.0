/**
 *  Obj
 * @type {Object}
 */

let Obj = {};

(function ($) {
    "use strict";

    /************************************************************
     * Predefined letiables
     *************************************************************/
    let $window = $(window),
        $body = $('body'),
        $document = $(document);

    /**
     * exists - TuanNA
     * @return true
     */
    $.fn.exists = function () {
        return this.length > 0;
    };

    /**
     * isMobile - Check mobile screen - TuanNA
     * @return void
     */
    $.fn.isMobile = function () {
        if ($window.width() > 750) {
            return false;
        }
        return true;
    };

    /**
     * uaSetting - TuanNA
     * @return void
     */
    Obj.uaSetting = function () {
        let _ua = (function (u) {
            return {
                Tablet: (u.indexOf('windows') !== -1 && u.indexOf('touch') !== -1 && u.indexOf('tablet pc') === -1) ||
                    u.indexOf('ipad') !== -1 ||
                    (u.indexOf('android') !== -1 && u.indexOf('mobile') === -1) ||
                    (u.indexOf('firefox') !== -1 && u.indexOf('tablet') !== -1) ||
                    u.indexOf('kindle') !== -1 ||
                    u.indexOf('silk') !== -1 ||
                    u.indexOf('playbook') !== -1,
                Mobile: (u.indexOf('windows') !== -1 && u.indexOf('phone') !== -1) ||
                    u.indexOf('iphone') !== -1 ||
                    u.indexOf('ipod') !== -1 ||
                    (u.indexOf('android') !== -1 && u.indexOf('mobile') !== -1) ||
                    (u.indexOf('firefox') !== -1 && u.indexOf('mobile') !== -1) ||
                    u.indexOf('blackberry') !== -1,
            }
        })(window.navigator.userAgent.toLowerCase());
        if (_ua.Tablet || _ua.Mobile) {
            $body.addClass('sp');
        }
    }

    /**
     * initAniScroll
     * @return {[type]}
     */
    Obj.initAniScroll = function () {
        let scrollOff = $('.scrollToggle'),
            windowsTop = $window.scrollTop(),
            wh = $window.height();
        scrollOff.exists() && scrollOff.each(function () {
            let $this = $(this),
                scrollOffTop = $(this).offset().top,
                checkPosTop = windowsTop + wh - 20;
            $this.addClass('ani--scrollOff');
            (checkPosTop > scrollOffTop && $this.hasClass('ani--scrollOff'))
                ? onScroll($(this))
                : offScroll($(this));
        });

        function onScroll(el) {
            el.removeClass('ani--scrollOff').addClass('ani--scrollOn');
        }

        function offScroll(el) {
            el.removeClass('ani--scrollOn').addClass('ani--scrollOff');
        }
    }

    /**
     * handleStickMenu
     * @return {void}
     */
    Obj.handleStickMenu = function () {
        let header = $('.header');
        let headerTop = $('.header__top');
        let headerBot = $('.header__bottom');

        $window.on('resize', function (e) {
            e.preventDefault();
            let hHeaderTop = headerTop.outerHeight();
            if (header.isMobile() && header.exists()) {
                header.addClass('is--sticky');
                headerBot.css('margin-top', hHeaderTop);
            } else {
                header.removeClass('is--sticky');
                headerBot.removeAttr('style');
            }
        });
        $window.trigger('resize');
    }

    /**
     * handleToggleMenuMobile
     * @return {[type]}
     */
    Obj.handleToggleMenuMobile = function () {
        let el = $('#toggle-menu');
        let elClose = $('.menu__close');
        el.exists() && el.click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            $body.hasClass("open-mobile-menu") ? closeMenu() : openMenu();
        });

        $body.on("click", ".menu__overlay, .menu__close", function (e) {
            closeMenu();
        });

        function openMenu() {
            $body.addClass("open-mobile-menu hidden");
        }

        function closeMenu() {
            $body.removeClass("open-mobile-menu hidden");
        }
    }

    /**
     * handleMenuDropdown
     * @return {void}
     */
    Obj.handleMenuDropdown = function () {
        let el = $('.dropdown');

        el.exists() && el.each(function () {
            let $this = $(this),
                elClick = $this.find('.dropdown__arrow');
            elClick.on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                let parents = $(this).parents('.dropdown');
                let parent = $(this).parent();
                if ($body.isMobile()) {
                    parents.toggleClass('active');
                    parent.next().slideToggle(150);
                    el.not(parents)
                        .removeClass('active')
                        .find('.dropdown__content')
                        .stop()
                        .slideUp(150);
                } else {
                    window.location.href = $(this).parent().attr('href');
                }
            });
        });
    }

    /**
     * handleFixImgIE
     * @param  {string} el
     * @return {void}
     */
    Obj.handleFixImgIE = function (el) {
        let userAgent,
            ieReg,
            ie;
        userAgent = window.navigator.userAgent;
        ieReg = /msie|Trident.*rv[ :]*11\./gi;
        ie = ieReg.test(userAgent);
        if (ie) {
            $(el).each(function () {
                let $container = $(this),
                    imgUrl = $container.find('img').prop('src');
                $container.find('img').hide();
                if (imgUrl) {
                    $container.css('background', 'url(' + imgUrl + ') no-repeat center / cover;');
                }
            });
        }
    }

    Obj.initSlider = function (el) {
        let mainSlider = $('#main-slider');

        mainSlider.exists() && mainSlider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 3500,
            prevArrow: '<button type="button" class="slider__arrow slider--prev"></button>',
            nextArrow: '<button type="button" class="slider__arrow slider--next"></button>',
        });

    }

    /**
     * configs slider news
     */
    Obj.initSlideNews = function () {
        let slideEle = $('#news');
        slideEle.exists() && slideEle.slick({
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 3500,
            prevArrow: '<button type="button" class="slider__arrow slider--prev"></button>',
            nextArrow: '<button type="button" class="slider__arrow slider--next"></button>',
        });
    }
    Obj.accordionSearch = function () {
        $('.search-province__title').click(function(e) {
            e.preventDefault();
            let $this = $(this);
            if ($this.next().hasClass('show')) {
                $this.next().removeClass('show');
                $this.removeClass('show');
                $this.next().slideUp(350);
            } else {
                $this.parent().parent().parent().find('.search-province__title').removeClass('show');
                $this.parent().parent().parent().find('.search-province__list').removeClass('show');
                $this.parent().parent().parent().find('.search-province__list').slideUp(350);
                $this.next().toggleClass('show');
                $this.toggleClass('show');
                $this.next().slideToggle(350);
            }
        });
    }
    Obj.searchBar = function (el) {
        $("#searchArea").select2({
            placeholder: "エリア・駅名",
            dropdownParent: $('#search-bar'),
            width: '100%',
            tags: true,
        }).on('select2:select', function (e) {
            var select_val = $(e.currentTarget).val();

            if (select_val[0] === '') {
                $(this).parent().addClass('search-area-custom');
                $(this).parent().find(".select2-search__field").attr("placeholder", "");
                $(this).val("");
                $(this).select2("close");
            } else {
                $(this).parent().removeClass('search-area-custom');
            }

            $(e.currentTarget).val([])
            $('#searchKeywords').select2("open");

        }).on("select2:unselecting", function (event) {
            if (!event.params.args.originalEvent) {
                return true
            } else if ($(event.params.args.originalEvent.currentTarget).attr('aria-selected')) {
                return false
            }
        }).on("select2:opening", function () {
            $('.select2-search__field').focus(function () {
                this.blur();
                return false
            })
        });

        $("#searchKeywords").select2({
            placeholder: "診療科・キーワード",
            maximumSelectionLength: 2,
            dropdownParent: $('#search-bar'),
            width: '100%',
            tags: true,
            language: {
                maximumSelected: function (e) {
                    var t = "診療科は最大" + e.maximum + "つまで選択できます";
                    return t;
                }
            }
        }).on("select2:select", function (e) {
            if ($(this).select2('data').length >= 2) {
                $(this).select2("close");
                $(this).select2("open");
            } else {
                $(this).select2("open");
            }
        }).on("select2:unselecting", function (event) {
            if (!event.params.args.originalEvent) {
                return true
            } else if ($(event.params.args.originalEvent.currentTarget).attr('aria-selected')) {
                return false
            }
        }).on("select2:opening", function () {
            $('.select2-search__field').focus(function () {
                this.blur();
                return false
            })
        });
    }

    /************************************************************
     * Obj Window load, ready, scroll, resize and functions
     *************************************************************/
    //Window load functions
    //
    $window.on('load', function () {
        Obj.uaSetting();
        Obj.handleFixImgIE('.thumbnail');
        Obj.initAniScroll();
    });
    //Document ready functions
    $document.ready(function () {
        Obj.handleToggleMenuMobile();
        Obj.handleMenuDropdown();
        Obj.initSlider();
        Obj.initSlideNews();
        Obj.handleStickMenu();
        Obj.searchBar();
        Obj.accordionSearch();
    });

    //Window scroll functions
    $window.on('scroll', function () {
        Obj.initAniScroll();
    });

    //Window resize functions
    $window.on('resize', function () {
        Obj.handleFixImgIE('.thumbnail');
    });

})(jQuery);

/**
 *
 * @name        Scroll to top Chrome Extension
 * @author      Yaroslav Peteychuk <https://www.peteychuk.com/>
 *
 */

(function(window, undefined)
{
    "use strict";

    var app = {
        options: {
            oldPos: 0,
            radius: 400,
            timer: null,
            interval: 1,
            el: null
        },
        init: function() {
            if(document.body !== null) {
                var newElement = document.createElement("div");
                newElement.innerHTML = this.view;
                document.body.appendChild(newElement);
                this.options.el = document.getElementById('scrollToTopExtensionChromeUniqueNickPeteychuk');
                this.options.el.onclick = function() {
                    this.toTop();
                }.bind(this);

                window.addEventListener('scroll', function() {
                    this.scrollEvent();
                }.bind(this), false);

                var css = '#scrollToTopExtensionChromeUniqueNickPeteychuk{' +
                    'opacity: 0.5 !important; ' +
                    'width: 32px !important; ' +
                    'height: 32px !important; ' +
                    'padding: 0 10px 10px 0 !important; ' +
                    'position: fixed !important; ' +
                    'right: -42px; ' +
                    'bottom: -42px; ' +
                    'z-index: 9999999 !important; ' +
                    '-webkit-transition: all 200ms !important; ' +
                    'cursor: pointer !important;' +
                    '} ' +
                    '#scrollToTopExtensionChromeUniqueNickPeteychuk:hover{opacity: 1 !important;}';

                var head = document.getElementsByTagName('head')[0] || document.body,
                    style = document.createElement('style');

                style.type = 'text/css';
                if (style.styleSheet) {
                    style.styleSheet.cssText = css;
                } else {
                    style.appendChild(document.createTextNode(css));
                }
                head.appendChild(style);
            }
        },
        toTop: function() {
            document.documentElement.scrollTop = 0;
        },
        scrollEvent: function() {
            clearTimeout(this.options.timer);
            this.options.timer = setTimeout(function() {
                this.scroll();
            }.bind(this), this.options.interval);
        },
        scroll: function() {
            var coordinates = this.getCoordinates();

            if (coordinates == this.options.oldPos)
                return;

            if ( (coordinates > this.options.radius) && (coordinates < this.options.oldPos) ) {
                this.options.el.style.right = '0px';
                this.options.el.style.bottom = '0px';
            } else {
                this.options.el.style.right = '-42px';
                this.options.el.style.bottom = '-42px';
            }
            this.options.oldPos = coordinates;
        },
        getCoordinates: function() {
            return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        },
        view: '<div id="scrollToTopExtensionChromeUniqueNickPeteychuk"><img style="width: 32px !important; height: 32px !important; min-width: 32px !important; max-width: 32px !important; min-height: 32px !important; max-height: 32px !important; padding: 0 !important; margin: 0 !important; position: absolute !important; right: 10px !important; bottom: 10px !important;" src="' + chrome.extension.getURL("top.png") + '"></div>'
    };
    app.init();
})(window);

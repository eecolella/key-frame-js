;
(function ($, window, document, undefined) {

    $.kf = window.kf;

    var pluginName = "kf",
        evtsAnim = 'animationend webkitAnimationEnd mozAnimationEnd oAnimationEnd MSAnimationEnd animationiteration webkitAnimationIteration mozAnimationIteration MSAnimationIteration oAnimationIteration',
        defaults = {
            duration: 600,
            timingFunction: "ease",
            delay: 0,
            repeat: 1,
            direction: "normal",
            fillMode: "forwards",
            complete: undefined
        };

    function Plugin(element, options) {
        this.$el = $(element);

        this.settings = $.extend({}, defaults, options);

        return this;
    }

    Plugin.prototype = {
        play: function (options, callback) {

            if (typeof options === 'string')
                options = this._splitAnimationString(options, callback);

            var settings = $.extend({}, this.settings, options),
                animationStr = this._createAnimationStr(settings);

            if (settings.complete)
                this.$el
                    .off(evtsAnim)
                    .on(evtsAnim, settings.complete);

            this.$el
                .addClass(settings.name)
                .css('animation', animationStr);

        },
        pause: function () {
            this.$el.css('animation-play-state', 'paused');
        },
        resume: function () {
            this.$el.css('animation-play-state', 'running');
        },
        clean: function () {
            this.$el
                .css('animation', 'none')
                .off(evtsAnim);
        },
        _splitAnimationString: function (str, callback) {
            str = str.trim().split(' ');
            return {
                name: str[0],
                duration: parseInt(str[1]),
                timingFunction: str[2],
                delay: parseInt(str[3]),
                repeat: str[4],
                direction: str[5],
                fillMode: str[6],
                complete: callback
            };
        },
        _createAnimationStr: function (s) {
            return s.name + ' ' +
                s.duration + 'ms ' +
                s.timingFunction + ' ' +
                s.delay + 'ms ' +
                s.repeat + ' ' +
                s.direction + ' ' +
                s.fillMode
        }
    };

    $.fn[ pluginName ] = function (action, options) {
        this.each(function () {
            var plg = $.data(this, "plugin_" + pluginName),
                plg = plg ? plg : $.data(this, "plugin_" + pluginName, new Plugin(this, options));

            plg[action](options);
        });

        return this;
    };

})(jQuery, window, document);
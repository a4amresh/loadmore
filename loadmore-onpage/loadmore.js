;
(function($, window, document, undefined) {
    "use strict";
    var PluginName = "loadMore";

    /* Plugin Initialize
    ------------------------------------------------------------*/
    function Plugin(elem, options) {
        this.self = this;
        this.elem = elem;
        this.$elem = $(elem);
        this.metadata = this.$elem.data("options");
        this.options = $.extend({}, $.fn[PluginName].default, this.metadata, options);
        this.lists = $(elem).children(this.options.selector);
    };

    /* Plugin Prototype
    ------------------------------------------------------------*/
    $.extend(Plugin.prototype, {
        inIt: function() {
            var self = this;
            if (self.lists.length <= self.options.limit) {
                self.Out();
            } else {
                self.More();
            }
            self.firstLoad = [];
            self.firstLoad.push(self.lists.splice(0, self.options.limit));
            //$(self.lists).not(self.firstLoad[0]).fadeOut();
            //$(self.firstLoad[0]).fadeIn();
            self.show(self.firstLoad[0]);
        },
        More: function() {
            var self = this;
            var i = 0;
            $(self.options.loadBtn).on('click', function() {
                i += 1;
                if (self.lists.length) {
                    self.firstLoad.push(self.lists.splice(0, self.options.load));
                    //$(self.firstLoad[i]).fadeIn();
                    self.show(self.firstLoad[i]);
                }
                if (self.lists.length == 0) {
                    self.Out();
                }
            });
        },
        show: function(e) {
            var self = this;
            $(e).fadeIn();
            if (self.options.animate) {
                //$(e).addClass("animated " + self.options.animateIn);
                self.animateCss(self.options.animateIn, e);
            }
        },
        Out: function() {
            var self = this;
            $(self.options.loadBtn).hide();
        },
        animateCss: function(animationName, elem) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            $(elem).addClass('animated ' + animationName).one(animationEnd, function() {
                $(elem).removeClass('animated ' + animationName);
            });
        }
    });


    /* Function Initialize
    ------------------------------------------------------------*/
    $.fn[PluginName] = function(options) {
        return this.each(function() {
            new Plugin(this, options).inIt();
        })
    };

    /* Plugin Default Options
    ------------------------------------------------------------*/
    $.fn[PluginName].default = {
        selector: '',
        limit: 3,
        load: 3,
        loadBtn: '',
        animate: true,
        animateIn: 'fadeInUp'
    };
}(jQuery, window, document));
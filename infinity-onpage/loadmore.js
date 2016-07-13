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
            $(self.firstLoad[0]).fadeIn();
        },
        More: function() {
            var self = this;
            var i = 0;
            $(window).scroll(function() {
                var winH = $(window).height();
                var docH = $(document).height();
                var scroll = $(window).scrollTop();
                if (docH - winH == scroll) {
                    i += 1;
                    if (self.lists.length) {
                        self.firstLoad.push(self.lists.splice(0, self.options.loadItem));
                        $(self.firstLoad[i]).fadeIn();
                    }
                    if (self.lists.length == 0) {
                        self.Out();
                    }
                }
            })
        },
        Out: function() {
            var self = this;
            $(self.options.loadBtn).hide();
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
        loadItem: 3,
        loadBtn: '#btn'
    };
}(jQuery, window, document));
'use strict';
var InitMediaEvents = (function() {
    var breakpointsNames,
        naxBreakpointName = 'max',
        defaultBreakpoints = {
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200
        };
    return {
        initialized: false,
        init: function (data) {
            this.breakpoints = (data && data.breakpoints) ? data.breakpoints : defaultBreakpoints;
            this.eventName = (data && data.eventName) ? data.eventName : 'media';
            this.initСustomEvents();
            this.lastActiveEvent = this.mediaVar();
            this.mediaEvents();
            window.addEventListener('resize', this.mediaEvents.bind(this), false);
        },
        initСustomEvents: function () {
            var i, iLength;
            breakpointsNames = Object.keys(this.breakpoints);
            for (i = 0, iLength = breakpointsNames.length; i < iLength; i++) {
                this.createCustomEvent(breakpointsNames[i]);
            }
            this.createCustomEvent(naxBreakpointName);
        },
        createCustomEvent: function (breakpoint) {
            var name = this.eventName + breakpoint.toUpperCase();
            window[name] = new CustomEvent(name);
        },
        getViewportWidth: function () {
            var de = document.documentElement,
                un = 'undefined';
            if (typeof window.innerWidth !== un) {
                return window.innerWidth;
            } else if (typeof de !== un && typeof de.clientWidth !== un) {
                return de.clientWidth;
            } else {
                return document.getElementsByTagName('body')[0].clientWidth;
            }
        },
        mediaVar: function () {
            var w = this.getViewportWidth(),
                lastPossibleBreakpoint = breakpointsNames[breakpointsNames.length - 1];

            if (w > this.breakpoints[lastPossibleBreakpoint]) {
                return this.setMediaVar(naxBreakpointName);
            } else {
                for (var key in this.breakpoints) {
                    if (this.breakpoints.hasOwnProperty(key) && (w <= this.breakpoints[key])) {
                        return this.setMediaVar(key);
                    }
                }
            }
        },
        setMediaVar: function (m) {
            return this.eventName + m.toUpperCase();
        },
        mediaEvents: function () {
            this.activeEvent = this.mediaVar();
            if ((this.lastActiveEvent !== this.activeEvent) || !this.initialized) {
                window.dispatchEvent(window[this.activeEvent]);
                this.lastActiveEvent = this.activeEvent;
            }
            this.initialized = true;
        }
    };
})();



"use strict";
(window.webpackJsonp = window.webpackJsonp || []).push([[11], { 187: function (e, n, a) {
            "use strict";
            a.r(n);
            var r = a(0), t = a.n(r), l = a(60);
            n.default = function (_a) {
                var e = _a.onChange, n = _a.filter, a = _a.field, r = _a.innerRef, u = _a.value;
                if (!n)
                    return null;
                var i = a.getFilterLabel(n);
                return t.a.createElement(l.c, { onChange: function (_a) {
                        var n = _a.target.value;
                        e(n);
                    }, ref: r, placeholder: i, value: u });
            };
        } }]);

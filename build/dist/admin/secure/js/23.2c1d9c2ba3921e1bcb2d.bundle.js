"use strict";
(window.webpackJsonp = window.webpackJsonp || []).push([[23], { 204: function (e, n, a) {
            "use strict";
            a.r(n);
            var r = a(0), t = a.n(r), l = a(60);
            n.default = function (_a) {
                var e = _a.onChange, n = _a.filter, a = _a.field, r = _a.innerRef, c = _a.value;
                if (!n)
                    return null;
                var o = a.getFilterLabel(n);
                return t.a.createElement(l.c, { onChange: function (n) { var a = n.target.value; e(a.replace(/[^\d,\s]/g, "")); }, ref: r, placeholder: o, value: c });
            };
        } }]);

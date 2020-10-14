"use strict";
(window.webpackJsonp = window.webpackJsonp || []).push([[16], { 203: function (e, t, a) {
            "use strict";
            a.r(t);
            var n = a(61), o = a(0), r = a.n(o), l = a(60);
            t.default = function (_a) {
                var e = _a.onChange, t = _a.autoFocus, a = _a.field, o = _a.value, c = _a.errors;
                var u = "ks-input-" + a.path;
                return r.a.createElement(n.a, null, r.a.createElement(n.d, { htmlFor: u, field: a, errors: c }), r.a.createElement(n.b, { text: a.adminDoc }), r.a.createElement(n.c, null, r.a.createElement(l.c, { autoComplete: "off", autoFocus: t, type: "text", value: (function (e) { return "string" == typeof e ? e : "number" == typeof e ? String(e) : ""; })(o), onChange: function (t) { var a = t.target.value; e(a.replace(/\D/g, "")); }, id: u })));
            };
        } }]);

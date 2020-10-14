"use strict";
(window.webpackJsonp = window.webpackJsonp || []).push([[14], { 201: function (e, t, a) {
            "use strict";
            a.r(t);
            var n = a(0), r = a.n(n);
            t.default = function (_a) {
                var e = _a.data, t = _a.field, a = _a.Link;
                if (!e)
                    return null;
                var i = t.getRefList().path;
                return r.a.createElement(n.Fragment, null, (Array.isArray(e) ? e : [e]).filter(function (e) { return e; }).map(function (e, t) { return r.a.createElement(n.Fragment, { key: e.id }, t ? ", " : "", r.a.createElement(a, { path: i, item: e }, e._label_)); }));
            };
        } }]);

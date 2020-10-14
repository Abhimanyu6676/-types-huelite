"use strict";
(window.webpackJsonp = window.webpackJsonp || []).push([[12], { 186: function (e, o, t) {
            "use strict";
            t.r(o);
            var n = t(1), r = t(61), s = t(60);
            o.default = function (_a) {
                var e = _a.onChange, o = _a.autoFocus, t = _a.field, c = _a.errors, i = _a.value;
                var a = t.config.isMultiline, l = i || "", u = "ks-input-" + t.path, d = c.every(function (e) { return !(e instanceof Error && "AccessDeniedError" === e.name); }), f = c.find(function (e) { return e instanceof Error && "AccessDeniedError" === e.name; });
                return Object(n.jsx)(r.a, null, Object(n.jsx)(r.d, { htmlFor: u, field: t, errors: c }), Object(n.jsx)(r.b, { text: t.adminDoc }), Object(n.jsx)(r.c, null, Object(n.jsx)(s.c, { autoComplete: "off", autoFocus: o, type: "text", value: d ? l : void 0, placeholder: d ? void 0 : f.message, onChange: function (o) { e(o.target.value); }, id: u, isMultiline: a })));
            };
        } }]);

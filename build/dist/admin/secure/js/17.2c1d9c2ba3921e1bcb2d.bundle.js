"use strict";
(window.webpackJsonp = window.webpackJsonp || []).push([[17], { 192: function (e, t, c) {
            "use strict";
            c.r(t);
            var s = c(1), n = c(61), o = c(93);
            t.default = function (_a) {
                var e = _a.onChange, t = _a.autoFocus, c = _a.field, a = _a.value, r = _a.errors;
                var i = a || !1, d = "ks-input-" + c.path;
                return Object(s.jsx)(n.a, null, Object(s.jsx)(n.b, { text: c.adminDoc }), Object(s.jsx)(n.c, { css: { height: 35, alignItems: "center" } }, Object(s.jsx)(o.a, { autoFocus: t, checked: i, onChange: function (t) { e(t.target.checked); }, id: d }), Object(s.jsx)(n.d, { htmlFor: d, field: c, errors: r, css: { padding: "4px", fontSize: "1rem" } })));
            };
        } }]);

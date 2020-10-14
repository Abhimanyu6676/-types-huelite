"use strict";
(window.webpackJsonp = window.webpackJsonp || []).push([[19], { 196: function (e, n, o) {
            "use strict";
            o.r(n);
            var t = o(1), r = o(61), s = o(3), a = o(74);
            n.default = function (_a) {
                var e = _a.onChange, n = _a.autoFocus, o = _a.field, c = _a.value, l = _a.renderContext, i = _a.errors;
                var d = o.options.find(function (e) { return e.value === c; }), u = "ks-input-" + o.path, j = i.every(function (e) { return !(e instanceof Error && "AccessDeniedError" === e.name); }), b = i.find(function (e) { return e instanceof Error && "AccessDeniedError" === e.name; }), p = "dialog" === l ? { menuPortalTarget: document.body, menuShouldBlockScroll: !0 } : null;
                return Object(t.jsx)(r.a, null, Object(t.jsx)(r.d, { htmlFor: u, field: o, errors: i }), Object(t.jsx)(r.b, { text: o.adminDoc }), Object(t.jsx)(r.c, null, Object(t.jsx)("div", { css: { flex: 1 } }, Object(t.jsx)(a.a, Object(s.a)({ autoFocus: n, value: j ? d : void 0, placeholder: j ? void 0 : b.message, options: o.options, onChange: function (n) { e(n ? n.value : null); }, isClearable: !0, id: "react-select-" + u, inputId: u, instanceId: u }, p)))));
            };
        } }]);

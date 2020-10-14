"use strict";
(window.webpackJsonp = window.webpackJsonp || []).push([[22], { 200: function (e, n, l) {
            "use strict";
            l.r(n);
            l(9), l(4), l(1);
            var t = l(0), a = l.n(t), i = (l(3), l(74), l(40), l(183), l(184));
            var u = function (_a) {
                var e = _a.children;
                return a.a.createElement("div", { onClick: function (e) { e.preventDefault(), e.stopPropagation(); } }, e);
            };
            n.default = function (_a) {
                var e = _a.onChange, n = _a.filter, l = _a.field, t = _a.value;
                if (!n)
                    return null;
                var r = "ks-input-" + l.path;
                return a.a.createElement(u, null, a.a.createElement(i.a, { field: l, renderContext: null, htmlID: r, onChange: function (n) { if (null === n)
                        e(null);
                    else {
                        var l_1 = n.value;
                        l_1 && e(l_1.id);
                    } }, value: t, isMulti: !1 }));
            };
        } }]);

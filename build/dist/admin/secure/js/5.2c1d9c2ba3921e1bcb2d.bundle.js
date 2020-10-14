"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
(window.webpackJsonp = window.webpackJsonp || []).push([[5], { 181: function (e, t, i) {
            "use strict";
            var a = i(9), r = i(4), s = i(179), n = i(180), l = i.n(n);
            t.a = function e(t, i, n) { var c = this, u = i.readViews, h = i.preloadViews, o = i.getListByKey, b = i.adminPath, p = i.authStrategy, f = t.label, O = t.path, d = t.type, y = t.access, j = t.isOrderable, g = t.isPrimaryKey, w = t.isRequired, v = t.adminDoc, V = t.defaultValue, m = Object(r.a)(t, ["label", "path", "type", "access", "isOrderable", "isPrimaryKey", "isRequired", "adminDoc", "defaultValue"]); Object(s.a)(this, e), Object(a.a)(this, "getQueryFragment", (function () { return c.path; })), Object(a.a)(this, "serialize", (function (e) { return e[c.path] || null; })), Object(a.a)(this, "validateInput", (function () { })), Object(a.a)(this, "deserialize", (function (e) { return e[c.path]; })), Object(a.a)(this, "hasChanged", (function (e, t) { return !l()(e[c.path], t[c.path]); })), Object(a.a)(this, "getDefaultValue", (function () { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.originalInput, i = void 0 === t ? {} : t, a = e.prefill, r = void 0 === a ? {} : a; return c._getDefaultValue({ originalInput: i, prefill: r }); })), Object(a.a)(this, "initCellView", (function () { var e = c.views.Cell; e && c.readViews([e]); })), Object(a.a)(this, "initFieldView", (function () { var e = c.views.Field; e && c.readViews([e]); })), Object(a.a)(this, "initFilterView", (function () { var e = c.views.Filter; e && c.readViews([e]); })), Object(a.a)(this, "getFilterTypes", (function () { return []; })), Object(a.a)(this, "getFilterValue", (function (e) { return e; })), this.config = m, this.label = f, this.path = O, this.type = d, this.maybeAccess = y, this.isOrderable = j, this.isPrimaryKey = g, this.isRequired = w, this.adminDoc = v, this.readViews = u, this.preloadViews = h, this.getListByKey = o, this.adminPath = b, this.authStrategy = p, this.views = n, this._getDefaultValue = "function" != typeof V ? function (e) { return e.prefill[c.path] || V; } : V; };
        }, 191: function (e, t, i) {
            "use strict";
            i.r(t);
            var a = i(9), r = i(4), s = (i(179), i(180), i(181));
            function n(e, t) { var i = Object.keys(e); if (Object.getOwnPropertySymbols) {
                var a = Object.getOwnPropertySymbols(e);
                t && (a = a.filter((function (t) { return Object.getOwnPropertyDescriptor(e, t).enumerable; }))), i.push.apply(i, a);
            } return i; }
            function l(e) { for (var t = 1; t < arguments.length; t++) {
                var i = null != arguments[t] ? arguments[t] : {};
                t % 2 ? n(Object(i), !0).forEach((function (t) { Object(a.a)(e, t, i[t]); })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : n(Object(i)).forEach((function (t) { Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t)); }));
            } return e; }
            var c = /** @class */ (function (_super) {
                __extends(c, _super);
                function c(e) {
                    var t = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        t[_i - 1] = arguments[_i];
                    }
                    var _this = this;
                    var _a = e.defaultValue, i = _a === void 0 ? !1 : _a;
                    _this = _super.apply(this, __spreadArrays([l(l({}, Object(r.a)(e, ["defaultValue"])), {}, { defaultValue: i })], t)) || this, Object(a.a)(_this, "serialize", function (e) { return e[_this.path]; }), Object(a.a)(_this, "deserialize", function (e) { return e[_this.path]; }), Object(a.a)(_this, "getFilterGraphQL", function (_a) {
                        var e = _a.type, t = _a.value;
                        return ("is" === e ? "" + _this.path : _this.path + "_" + e) + ": " + t;
                    }), Object(a.a)(_this, "getFilterLabel", function (_a) {
                        var e = _a.label;
                        return _this.label + " " + e.toLowerCase();
                    }), Object(a.a)(_this, "formatFilter", function (_a) {
                        var e = _a.label, t = _a.value;
                        return _this.getFilterLabel({ label: e }) + ": \"" + t + "\"";
                    }), Object(a.a)(_this, "getFilterTypes", function () { return [{ type: "is", label: "Is", getInitialValue: function () { return "true"; } }, { type: "not", label: "Is not", getInitialValue: function () { return "true"; } }]; });
                    return _this;
                }
                return c;
            }(s.a));
            t.default = c;
        } }]);

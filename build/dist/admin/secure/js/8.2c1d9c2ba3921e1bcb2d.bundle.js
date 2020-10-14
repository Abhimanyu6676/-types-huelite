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
(window.webpackJsonp = window.webpackJsonp || []).push([[8], { 181: function (t, e, i) {
            "use strict";
            var a = i(9), n = i(4), r = i(179), s = i(180), l = i.n(s);
            e.a = function t(e, i, s) { var o = this, u = i.readViews, h = i.preloadViews, c = i.getListByKey, p = i.adminPath, b = i.authStrategy, f = e.label, d = e.path, O = e.type, y = e.access, g = e.isOrderable, j = e.isPrimaryKey, v = e.isRequired, w = e.adminDoc, V = e.defaultValue, m = Object(n.a)(e, ["label", "path", "type", "access", "isOrderable", "isPrimaryKey", "isRequired", "adminDoc", "defaultValue"]); Object(r.a)(this, t), Object(a.a)(this, "getQueryFragment", (function () { return o.path; })), Object(a.a)(this, "serialize", (function (t) { return t[o.path] || null; })), Object(a.a)(this, "validateInput", (function () { })), Object(a.a)(this, "deserialize", (function (t) { return t[o.path]; })), Object(a.a)(this, "hasChanged", (function (t, e) { return !l()(t[o.path], e[o.path]); })), Object(a.a)(this, "getDefaultValue", (function () { var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = t.originalInput, i = void 0 === e ? {} : e, a = t.prefill, n = void 0 === a ? {} : a; return o._getDefaultValue({ originalInput: i, prefill: n }); })), Object(a.a)(this, "initCellView", (function () { var t = o.views.Cell; t && o.readViews([t]); })), Object(a.a)(this, "initFieldView", (function () { var t = o.views.Field; t && o.readViews([t]); })), Object(a.a)(this, "initFilterView", (function () { var t = o.views.Filter; t && o.readViews([t]); })), Object(a.a)(this, "getFilterTypes", (function () { return []; })), Object(a.a)(this, "getFilterValue", (function (t) { return t; })), this.config = m, this.label = f, this.path = d, this.type = O, this.maybeAccess = y, this.isOrderable = g, this.isPrimaryKey = j, this.isRequired = v, this.adminDoc = w, this.readViews = u, this.preloadViews = h, this.getListByKey = c, this.adminPath = p, this.authStrategy = b, this.views = s, this._getDefaultValue = "function" != typeof V ? function (t) { return t.prefill[o.path] || V; } : V; };
        }, 195: function (t, e, i) {
            "use strict";
            i.r(e);
            var a = i(9), n = i(4), r = (i(179), i(180), i(181));
            function s(t, e) { var i = Object.keys(t); if (Object.getOwnPropertySymbols) {
                var a = Object.getOwnPropertySymbols(t);
                e && (a = a.filter((function (e) { return Object.getOwnPropertyDescriptor(t, e).enumerable; }))), i.push.apply(i, a);
            } return i; }
            function l(t) { for (var e = 1; e < arguments.length; e++) {
                var i = null != arguments[e] ? arguments[e] : {};
                e % 2 ? s(Object(i), !0).forEach((function (e) { Object(a.a)(t, e, i[e]); })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : s(Object(i)).forEach((function (e) { Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e)); }));
            } return t; }
            var o = /** @class */ (function (_super) {
                __extends(o, _super);
                function o(t) {
                    var e = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        e[_i - 1] = arguments[_i];
                    }
                    var _this = this;
                    var _a = t.defaultValue, i = _a === void 0 ? null : _a, r = Object(n.a)(t, ["defaultValue"]);
                    _this = _super.apply(this, __spreadArrays([l(l({}, r), {}, { defaultValue: i })], e)) || this, Object(a.a)(_this, "getFilterGraphQL", function (_a) {
                        var _b = _a.value, t = _b.inverted, e = _b.options;
                        if (!e.length)
                            return "";
                        var i = e.length > 1;
                        var a = _this.path;
                        i && t ? a = _this.path + "_not_in" : i ? a = _this.path + "_in" : t && (a = _this.path + "_not");
                        var n = i ? "[" + e.map(function (t) { return t.value; }).join(",") + "]" : e[0].value;
                        return "string" === _this.dataType ? a + ": \"" + n + "\"" : a + ": " + n;
                    }), Object(a.a)(_this, "getFilterLabel", function () { return _this.label; }), Object(a.a)(_this, "formatFilter", function (_a) {
                        var t = _a.value;
                        if (!t.options.length)
                            return t.inverted ? _this.label + " is set" : _this.label + " has no value";
                        if (t.options.length > 1) {
                            var e_1 = t.options.map(function (t) { return t.label; }).join(", ");
                            return t.inverted ? _this.label + " is not in [" + e_1 + "]" : _this.label + " is in [" + e_1 + "]";
                        }
                        var e = t.options[0].label;
                        return t.inverted ? _this.label + " is not " + e : _this.label + " is " + e;
                    }), Object(a.a)(_this, "getFilterValue", function (t) { return t && t.options && t.options.length ? t : null; }), Object(a.a)(_this, "getFilterTypes", function () { return [{ type: "is", label: "Matches", getInitialValue: function () { return ({ inverted: !1, options: [] }); } }]; }), _this.options = r.options, _this.dataType = r.dataType;
                    return _this;
                }
                return o;
            }(r.a));
            e.default = o;
        } }]);

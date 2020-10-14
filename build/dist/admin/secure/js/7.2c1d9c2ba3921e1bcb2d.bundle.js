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
(window.webpackJsonp = window.webpackJsonp || []).push([[7], { 181: function (t, e, i) {
            "use strict";
            var a = i(9), r = i(4), n = i(179), s = i(180), l = i.n(s);
            e.a = function t(e, i, s) { var c = this, u = i.readViews, o = i.preloadViews, h = i.getListByKey, p = i.adminPath, b = i.authStrategy, f = e.label, d = e.path, y = e.type, O = e.access, g = e.isOrderable, j = e.isPrimaryKey, w = e.isRequired, v = e.adminDoc, m = e.defaultValue, V = Object(r.a)(e, ["label", "path", "type", "access", "isOrderable", "isPrimaryKey", "isRequired", "adminDoc", "defaultValue"]); Object(n.a)(this, t), Object(a.a)(this, "getQueryFragment", (function () { return c.path; })), Object(a.a)(this, "serialize", (function (t) { return t[c.path] || null; })), Object(a.a)(this, "validateInput", (function () { })), Object(a.a)(this, "deserialize", (function (t) { return t[c.path]; })), Object(a.a)(this, "hasChanged", (function (t, e) { return !l()(t[c.path], e[c.path]); })), Object(a.a)(this, "getDefaultValue", (function () { var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = t.originalInput, i = void 0 === e ? {} : e, a = t.prefill, r = void 0 === a ? {} : a; return c._getDefaultValue({ originalInput: i, prefill: r }); })), Object(a.a)(this, "initCellView", (function () { var t = c.views.Cell; t && c.readViews([t]); })), Object(a.a)(this, "initFieldView", (function () { var t = c.views.Field; t && c.readViews([t]); })), Object(a.a)(this, "initFilterView", (function () { var t = c.views.Filter; t && c.readViews([t]); })), Object(a.a)(this, "getFilterTypes", (function () { return []; })), Object(a.a)(this, "getFilterValue", (function (t) { return t; })), this.config = V, this.label = f, this.path = d, this.type = y, this.maybeAccess = O, this.isOrderable = g, this.isPrimaryKey = j, this.isRequired = w, this.adminDoc = v, this.readViews = u, this.preloadViews = o, this.getListByKey = h, this.adminPath = p, this.authStrategy = b, this.views = s, this._getDefaultValue = "function" != typeof m ? function (t) { return t.prefill[c.path] || m; } : m; };
        }, 199: function (t, e, i) {
            "use strict";
            i.r(e);
            var a = i(9), r = (i(4), i(179), i(180), i(181));
            function n(t, e) { var i = Object.keys(t); if (Object.getOwnPropertySymbols) {
                var a = Object.getOwnPropertySymbols(t);
                e && (a = a.filter((function (e) { return Object.getOwnPropertyDescriptor(t, e).enumerable; }))), i.push.apply(i, a);
            } return i; }
            function s(t) { for (var e = 1; e < arguments.length; e++) {
                var i = null != arguments[e] ? arguments[e] : {};
                e % 2 ? n(Object(i), !0).forEach((function (e) { Object(a.a)(t, e, i[e]); })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : n(Object(i)).forEach((function (e) { Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e)); }));
            } return t; }
            var l = /** @class */ (function (_super) {
                __extends(l, _super);
                function l(t) {
                    var e = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        e[_i - 1] = arguments[_i];
                    }
                    var _this = this;
                    var _a = t.defaultValue, i = _a === void 0 ? (t.many ? [] : null) : _a;
                    _this = _super.apply(this, __spreadArrays([s(s({}, t), {}, { defaultValue: i })], e)) || this, Object(a.a)(_this, "getQueryFragment", function (t) {
                        if (t === void 0) { t = _this.path; }
                        return "\n      " + t + " {\n        id\n        _label_\n      }\n    ";
                    }), Object(a.a)(_this, "getFilterGraphQL", function (_a) {
                        var t = _a.type, e = _a.value;
                        return "contains" === t ? _this.path + "_some: {id: \"" + e + "\"}" : "is" === t ? _this.path + ": {id: \"" + e + "\"}" : void 0;
                    }), Object(a.a)(_this, "getFilterLabel", function (_a) {
                        var t = _a.label;
                        return _this.label + " " + t.toLowerCase();
                    }), Object(a.a)(_this, "formatFilter", function (_a) {
                        var t = _a.label, e = _a.value;
                        return _this.getFilterLabel({ label: t }) + ": \"" + e + "\"";
                    }), Object(a.a)(_this, "serialize", function (t) { var e = _this.path, i = _this.config.many; var a = t[e]; if (i) {
                        var t_1 = [];
                        return Array.isArray(a) && (t_1 = a.map(function (t) { return t.id; })), { disconnectAll: !0, connect: t_1.map(function (t) { return ({ id: t }); }) };
                    } return a ? { connect: { id: a.id } } : { disconnectAll: !0 }; }), Object(a.a)(_this, "getFilterTypes", function () { var t = _this.config.many; return t ? [{ type: "contains", label: "Contains", getInitialValue: function () { return null; } }] : [{ type: "is", label: "Is", getInitialValue: function () { return null; } }]; });
                    return _this;
                }
                l.prototype.getRefList = function () { return this.getListByKey(this.config.ref); };
                return l;
            }(r.a));
            e.default = l;
        } }]);

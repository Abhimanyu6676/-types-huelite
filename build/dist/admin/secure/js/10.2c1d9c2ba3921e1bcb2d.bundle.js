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
(window.webpackJsonp = window.webpackJsonp || []).push([[10], { 206: function (t, e, i) {
            "use strict";
            i.r(e);
            var a = i(9), s = i(4), n = i(179), r = i(180), l = i.n(r), u = function t(e, i, r) { var u = this, h = i.readViews, c = i.preloadViews, o = i.getListByKey, p = i.adminPath, b = i.authStrategy, d = e.label, f = e.path, y = e.type, g = e.access, w = e.isOrderable, j = e.isPrimaryKey, O = e.isRequired, V = e.adminDoc, m = e.defaultValue, v = Object(s.a)(e, ["label", "path", "type", "access", "isOrderable", "isPrimaryKey", "isRequired", "adminDoc", "defaultValue"]); Object(n.a)(this, t), Object(a.a)(this, "getQueryFragment", (function () { return u.path; })), Object(a.a)(this, "serialize", (function (t) { return t[u.path] || null; })), Object(a.a)(this, "validateInput", (function () { })), Object(a.a)(this, "deserialize", (function (t) { return t[u.path]; })), Object(a.a)(this, "hasChanged", (function (t, e) { return !l()(t[u.path], e[u.path]); })), Object(a.a)(this, "getDefaultValue", (function () { var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = t.originalInput, i = void 0 === e ? {} : e, a = t.prefill, s = void 0 === a ? {} : a; return u._getDefaultValue({ originalInput: i, prefill: s }); })), Object(a.a)(this, "initCellView", (function () { var t = u.views.Cell; t && u.readViews([t]); })), Object(a.a)(this, "initFieldView", (function () { var t = u.views.Field; t && u.readViews([t]); })), Object(a.a)(this, "initFilterView", (function () { var t = u.views.Filter; t && u.readViews([t]); })), Object(a.a)(this, "getFilterTypes", (function () { return []; })), Object(a.a)(this, "getFilterValue", (function (t) { return t; })), this.config = v, this.label = d, this.path = f, this.type = y, this.maybeAccess = g, this.isOrderable = w, this.isPrimaryKey = j, this.isRequired = O, this.adminDoc = V, this.readViews = h, this.preloadViews = c, this.getListByKey = o, this.adminPath = p, this.authStrategy = b, this.views = r, this._getDefaultValue = "function" != typeof m ? function (t) { return t.prefill[u.path] || m; } : m; };
            e.default = /** @class */ (function (_super) {
                __extends(default, _super);
                function default() {
                    var t = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        t[_i] = arguments[_i];
                    }
                    var _this = this;
                    _this = _super.apply(this, t) || this, Object(a.a)(_this, "getFilterGraphQL", function (_a) {
                        var t = _a.type, e = _a.value;
                        switch (t) {
                            case "is": return _this.path + ": \"" + e + "\"";
                            case "not": return _this.path + "_not: \"" + e + "\"";
                            case "in": return _this.path + "_in: [" + e.split(",").map(function (t) { return "\"" + t.trim() + "\""; }).join(",") + "]";
                            case "not_in": return _this.path + "_not_in: [" + e.split(",").map(function (t) { return "\"" + t.trim() + "\""; }).join(",") + "]";
                        }
                    }), Object(a.a)(_this, "getFilterLabel", function (_a) {
                        var t = _a.label, e = _a.type;
                        var i = "";
                        return ["in", "not_in"].includes(e) && (i = " (comma separated)"), _this.label + " " + t.toLowerCase() + i;
                    }), Object(a.a)(_this, "formatFilter", function (_a) {
                        var t = _a.label, e = _a.type, i = _a.value;
                        var a = i;
                        return ["in", "not_in"].includes(e) && (a = i.split(",").map(function (t) { return t.trim(); }).join(", ")), _this.label + " " + t.toLowerCase() + ": " + a;
                    }), Object(a.a)(_this, "getFilterTypes", function () { return [{ type: "is", label: "Is exactly", getInitialValue: function () { return ""; } }, { type: "not", label: "Is not", getInitialValue: function () { return ""; } }, { type: "in", label: "Is one of", getInitialValue: function () { return ""; } }, { type: "not_in", label: "Is not one of", getInitialValue: function () { return ""; } }]; });
                    return _this;
                }
                return default;
            }(u));
        } }]);

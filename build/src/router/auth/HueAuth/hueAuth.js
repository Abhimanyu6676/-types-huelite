"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hueAuthRouter = void 0;
var express = require("express");
exports.hueAuthRouter = express.Router();
var index_1 = require("../../../index");
var userDbHelper_1 = require("../../../services/dbHelper/userDbHelper");
exports.hueAuthRouter.post('/signin', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var log;
    return __generator(this, function (_a) {
        log = function (s) { console.log("<<SIGNIN POST ROUTE>> " + s); };
        loginWithEmail(req, res, log).then(function (_a) {
            var _b;
            var success = _a.success;
            log("fetching userData");
            userDbHelper_1.findUserWithEmail({ email: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.email }, log).then(function (user) {
                if (user) {
                    return res.json({ success: true, data: user });
                }
                else {
                    return res.json({ success: false, error: "USER DATA NOT FOUND" });
                }
            }).catch(function (error) {
                log('login failedsearch user error >>> ' + JSON.stringify(error));
                return res.json({ success: false, error: error });
            });
        }).catch(function (_a) {
            var success = _a.success, message = _a.message;
            log('login failed >> message => ' + JSON.stringify(message));
            return res.json({ success: false, error: message });
        });
        return [2 /*return*/];
    });
}); });
var loginWithEmail = function (req, res, _log) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
                var log, email, password, result;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            log = function (s) { _log && console.log("[ loginWithEmail ] " + s); };
                            log(">>" + ((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.email));
                            email = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.email;
                            password = (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.password;
                            return [4 /*yield*/, index_1.authStrategy.validate({
                                    email: email,
                                    password: password,
                                })];
                        case 1:
                            result = _d.sent();
                            if (result.success) {
                                // Create session and redirect
                                log("login successful ");
                                resolve({ success: true });
                            }
                            else {
                                // Return the failure
                                log("login Failed");
                                reject({ success: false, message: result.message });
                            }
                            return [2 /*return*/];
                    }
                });
            }); })];
    });
}); };

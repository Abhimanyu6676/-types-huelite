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
exports.createTimerResolverOutput = exports.createTimerResolverInput = exports.createTimerWithMacResolver = exports.timerUpdateResolverOutput = exports.timerUpdateResolverInput = exports.type_TimerObj = exports.type_timerLdbObj = exports.timerUpdateResolver = void 0;
var productDbHelper_1 = require("../dbHelper/productDbHelper");
var timerDbHelper_1 = require("../dbHelper/timerDbHelper");
var _a = require("@keystonejs/fields"), Integer = _a.Integer, Checkbox = _a.Checkbox, Select = _a.Select, Relationship = _a.Relationship;
exports.timerUpdateResolver = function (root, args, context, _, _a) {
    var query = _a.query;
    return __awaiter(void 0, void 0, void 0, function () {
        var timerFromQuery, updatedTimerNLdb;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, timerDbHelper_1.findTimerWithMacAndDst({ Mac: args.Mac, DST: args.DST })];
                case 1:
                    timerFromQuery = _c.sent();
                    console.log("\n\n-------------------------------------------------------------------");
                    console.log(JSON.stringify(args));
                    console.log("\n\n-------------------------------------------------------------------");
                    console.log("---------------------- " + JSON.stringify(timerFromQuery));
                    if (!timerFromQuery) return [3 /*break*/, 3];
                    return [4 /*yield*/, timerDbHelper_1.updateTimerAndLdbWithId({
                            timerId: timerFromQuery.id,
                            HR: args.HR,
                            MIN: args.MIN,
                            DAYS: args.DAYS,
                            DT: args.DT,
                            ET: args.ET,
                            LdbId: (_b = timerFromQuery === null || timerFromQuery === void 0 ? void 0 : timerFromQuery.ldb) === null || _b === void 0 ? void 0 : _b.id,
                            TS: args.TS,
                            DBS: args.DBS
                        })];
                case 2:
                    updatedTimerNLdb = _c.sent();
                    if (updatedTimerNLdb) {
                        return [2 /*return*/, {
                                updatedTimer: updatedTimerNLdb,
                                success: true
                            }];
                    }
                    _c.label = 3;
                case 3: return [2 /*return*/, {
                        updatedTimer: {},
                        success: false,
                    }];
            }
        });
    });
};
exports.type_timerLdbObj = "type type_timerLdbObj { id:ID!, TS: Int!, DST: Int!, DBS: Int! }";
exports.type_TimerObj = " type type_TimerObj { id:ID!, HR: Int!, MIN:Int!, DAYS: Int!, DT: Int!, ET: Int!, ldb:type_timerLdbObj! }";
exports.timerUpdateResolverInput = "input timerUpdateResolverInput {Mac: String!, HR: Int!, MIN:Int!, DAYS: Int!, DT: Int!, ET: Int!, TS: Int!, DST: Int!, DBS: Int!}";
exports.timerUpdateResolverOutput = "type timerUpdateResolverOutput {  updatedTimer:type_TimerObj!, success: Boolean!, }";
exports.createTimerWithMacResolver = function (root, _a, context, _, _b) {
    var Mac = _a.Mac, HR = _a.HR, MIN = _a.MIN, DAYS = _a.DAYS, DT = _a.DT, ET = _a.ET, TS = _a.TS, DST = _a.DST, DBS = _a.DBS;
    var query = _b.query;
    return __awaiter(void 0, void 0, void 0, function () {
        var log, product, _success, _timer, newTimer;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    log = function (s) { console.log("[[ createTimerResolver ]] " + s); };
                    return [4 /*yield*/, productDbHelper_1.findProductWithMac(Mac, log)];
                case 1:
                    product = _c.sent();
                    _success = false;
                    _timer = undefined;
                    if (!(product === null || product === void 0 ? void 0 : product.id)) return [3 /*break*/, 3];
                    log("product found proceeding to creating new timer for device -- " + JSON.stringify(product));
                    return [4 /*yield*/, timerDbHelper_1.createTimerAndLdbWithDeviceId({ deviceId: product.id, HR: HR, MIN: MIN, DAYS: DAYS, DT: DT, ET: ET, TS: TS, DST: DST, DBS: DBS }, log)];
                case 2:
                    newTimer = _c.sent();
                    if (newTimer) {
                        _timer = newTimer;
                        _success = true;
                        log("New timer created successfully -- " + JSON.stringify(newTimer));
                    }
                    return [3 /*break*/, 4];
                case 3:
                    log("product cannot be found, skipping product creation");
                    _c.label = 4;
                case 4: return [2 /*return*/, {
                        createTimer: _timer,
                        success: _success,
                    }];
            }
        });
    });
};
exports.createTimerResolverInput = "input createTimerResolverInput {Mac: String!, HR: Int!, MIN:Int!, DAYS: Int!, DT: Int!, ET: Int!, TS: Int!, DST: Int!, DBS: Int!}";
exports.createTimerResolverOutput = "type createTimerResolverOutput {  createTimer:type_TimerObj, success: Boolean!, }";

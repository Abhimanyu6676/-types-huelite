"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.createTimerAndLdbWithDeviceId = exports.updateTimerAndLdbWithId = exports.updateTimerLdbWithId = exports.updateTimerWithId = exports.findTimerWithMacAndDst = exports.query_findHueTimerWithMACAndDst = void 0;
var index_1 = require("../../index");
/**
 * find specific hueTimer with LDB.DST and MAC
 *
 * @param Mac Mac Address for the respective Device
 *
 * @param DST DB Specifier Type
 *
 * @returns Array of Matching Timers timer: { ldb:{ TS, DST, DBS }}
 *
 */
exports.query_findHueTimerWithMACAndDst = function () {
    return "\nquery( $Mac:String!, $DST:Int!){\n    allHueTimers( first :1, where : { AND : [\n      {device: {Mac:$Mac}}, \n      {ldb: {DST : $DST} }\n    ]}){\n        id\n        HR\n        MIN\n        DT\n        ET\n        DAYS\n        ldb{\n          id\n          TS\n          DST\n          DBS\n        }\n    }\n  }";
};
exports.findTimerWithMacAndDst = function (_a, _log) {
    var Mac = _a.Mac, DST = _a.DST;
    return __awaiter(void 0, void 0, void 0, function () {
        var log, timer;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    log = function (s) { _log && _log(" *find timer with MAC & DST* " + s); };
                    log(Mac + "  -- " + DST);
                    return [4 /*yield*/, index_1.keystone
                            .executeQuery(exports.query_findHueTimerWithMACAndDst(), {
                            variables: {
                                Mac: Mac,
                                DST: DST,
                            },
                        }).then(function (_a) {
                            var allHueTimers = _a.data.allHueTimers, errors = _a.errors;
                            //TODO verify data
                            if (allHueTimers === null || allHueTimers === void 0 ? void 0 : allHueTimers.length) {
                                log("timer found -- " + JSON.stringify(allHueTimers));
                                return allHueTimers[0];
                            }
                            else {
                                log("no timer found in query ---" + JSON.stringify(errors));
                                return undefined;
                            }
                        }).catch(function (err) {
                            log("Timer filter query failed -- " + JSON.stringify(err));
                            return undefined;
                        })];
                case 1:
                    timer = _b.sent();
                    return [2 /*return*/, timer];
            }
        });
    });
};
/**
 * @param id timer ID
 * @param HR hours 1 - 12 @optional
 * @param MIN minute 0 - 59 @optional
 * @param DAYS integer representing bits @optional
 * @param DT daytime 1-AM  --  2-PM @optional
 * @param ET event type 1-ON  --  2-OFF @optional
 *
 */
var mutation_updateTimerWithId = function () {
    return "\nmutation(\n  $id:ID!,\n  $HR:Int,\n  $MIN:Int,\n  $DT:Int,\n  $ET:Int,\n  $DAYS:Int,\n) {\n   updateHueTimer( id:$id, data:{\n    HR:$HR,\n    MIN:$MIN,\n    DT:$DT,\n    ET:$ET,\n    DAYS:$DAYS,\n  }){\n    id\n    HR\n\t\tMIN\n    DAYS\n    DT\n    ET\n  }\n}";
};
exports.updateTimerWithId = function (_a, _log) {
    var id = _a.id, HR = _a.HR, MIN = _a.MIN, DAYS = _a.DAYS, DT = _a.DT, ET = _a.ET;
    return __awaiter(void 0, void 0, void 0, function () {
        var log, updatedTimer;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    log = function (s) { _log && _log(" *update timer with id* " + s); };
                    return [4 /*yield*/, index_1.keystone.executeQuery(mutation_updateTimerWithId(), {
                            variables: {
                                id: id,
                                HR: HR,
                                MIN: MIN,
                                DAYS: DAYS,
                                DT: DT,
                                ET: ET
                            }
                        }).then(function (_a) {
                            var updateHueTimer = _a.data.updateHueTimer, errors = _a.errors;
                            if (updateHueTimer) {
                                log("timer updated successfully -- " + JSON.stringify(updateHueTimer));
                                return updateHueTimer;
                            }
                            else {
                                log("timer update failed -- " + JSON.stringify(errors));
                                return undefined;
                            }
                        }).catch(function (err) {
                            log("timer update query failed");
                            return undefined;
                        })];
                case 1:
                    updatedTimer = _b.sent();
                    return [2 /*return*/, updatedTimer];
            }
        });
    });
};
/**
 * @param id LDB ID
 *
 * @param TS new timestamp
 * @param DBS LDB_DATA_SYNC_STATUS
 *
 *
 */
var query_updateTimerldbwithId = function () {
    return "\n    mutation(\n        $id:ID!,\n        $TS:Int,\n        $DBS:Int,\n      ) {\n         updateHueLdb( id:$id, data:{\n          TS:$TS,\n          DBS:$DBS,\n        }){\n            id\n            TS\n            DST\n            DBS\n        }\n      }";
};
exports.updateTimerLdbWithId = function (_a, _log) {
    var id = _a.id, TS = _a.TS, DBS = _a.DBS;
    return __awaiter(void 0, void 0, void 0, function () {
        var log, updatedTimerLdb;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    log = function (s) { _log && _log(" *update timer LDB with id* " + s); };
                    return [4 /*yield*/, index_1.keystone.executeQuery(query_updateTimerldbwithId(), {
                            variables: {
                                id: id,
                                TS: TS,
                                DBS: DBS
                            }
                        }).then(function (_a) {
                            var updateHueLdb = _a.data.updateHueLdb, errors = _a.errors;
                            if (updateHueLdb) {
                                log("timerLDB updated successfully -- " + JSON.stringify(updateHueLdb));
                                return updateHueLdb;
                            }
                            else {
                                log("timerLDB update failed -- " + JSON.stringify(errors));
                                return undefined;
                            }
                        }).catch(function (err) {
                            log("timerLDB update query failed");
                            return undefined;
                        })];
                case 1:
                    updatedTimerLdb = _b.sent();
                    return [2 /*return*/, updatedTimerLdb];
            }
        });
    });
};
exports.updateTimerAndLdbWithId = function (_a, _log) {
    var timerId = _a.timerId, HR = _a.HR, MIN = _a.MIN, DAYS = _a.DAYS, DT = _a.DT, ET = _a.ET, LdbId = _a.LdbId, TS = _a.TS, DBS = _a.DBS;
    return __awaiter(void 0, void 0, void 0, function () {
        var log, updatedTimer, updatedTimerLdb;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    log = function (s) { _log && _log(" *update timer AND LDB with id* " + s); };
                    return [4 /*yield*/, exports.updateTimerWithId({ id: timerId, HR: HR, MIN: MIN, DAYS: DAYS, DT: DT, ET: ET }, log)];
                case 1:
                    updatedTimer = _b.sent();
                    log(" Timer update response >> " + JSON.stringify(updatedTimer));
                    if (!updatedTimer) return [3 /*break*/, 3];
                    return [4 /*yield*/, exports.updateTimerLdbWithId({ id: LdbId, TS: TS, DBS: DBS }, log)];
                case 2:
                    updatedTimerLdb = _b.sent();
                    log(" LDB update response >> " + JSON.stringify(updatedTimerLdb));
                    if (updatedTimerLdb) {
                        return [2 /*return*/, __assign(__assign({}, updatedTimer), { ldb: __assign({}, updatedTimerLdb) })];
                    }
                    _b.label = 3;
                case 3: return [2 /*return*/, undefined];
            }
        });
    });
};
/**
 *
 * @param obj.deviceId device ID to be connected
 * @param obj.HR hours 1 - 12
 * @param obj.MIN minute 0 - 59
 * @param obj.DAYS integer representing bits
 * @param obj.DT daytime 1-AM  --  2-PM
 * @param obj.ET event type 1-ON  --  2-OFF
 * @param obj.TS timestamp
 * @param obj.DST DBSpecifier as Int
 * @param obj.DBS LDB_DATA_SYNC_STATUS_t
 * @param _log @optional
 */
var mutation_createTimerAndLdbWithDeviceId = function () {
    return "\n    mutation(\n        $deviceId:ID!,\n        $HR:Int!,\n        $MIN:Int!,\n        $DT:Int!,\n        $ET:Int!,\n        $DAYS:Int!,\n        $TS:Int!,\n        $DBS:Int!,\n        $DST:Int!\n      ) {\n         createHueTimer(data:{\n          device:{connect:{id:$deviceId}},\n          HR:$HR,\n          MIN:$MIN,\n          DT:$DT,\n          ET:$ET,\n          DAYS:$DAYS,\n          ldb:{\n           create:{\n            TS:$TS,\n            DBS:$DBS,\n            DST:$DST\n            }\n          }\n        }){\n          id\n          HR\n          MIN\n          DAYS\n          DT\n          ET\n          ldb{\n            id\n            TS\n            DST\n            DBS\n          }\n        }\n      }";
};
/**
 *
 * @param obj.deviceId device ID to be connected
 * @param obj.HR hours 1 - 12
 * @param obj.MIN minute 0 - 59
 * @param obj.DAYS integer representing bits
 * @param obj.DT daytime 1-AM  --  2-PM
 * @param obj.ET event type 1-ON  --  2-OFF
 * @param obj.TS timestamp
 * @param obj.DST DBSpecifier as Int
 * @param obj.DBS LDB_DATA_SYNC_STATUS_t
 * @param _log @optional
 */
exports.createTimerAndLdbWithDeviceId = function (_a, _log) {
    var deviceId = _a.deviceId, HR = _a.HR, MIN = _a.MIN, DAYS = _a.DAYS, DT = _a.DT, ET = _a.ET, TS = _a.TS, DST = _a.DST, DBS = _a.DBS;
    return __awaiter(void 0, void 0, void 0, function () {
        var log, newTimer;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    log = function (s) { _log && _log(" *create timer AND LDB with deviceId* " + s); };
                    log("\n\n" + JSON.stringify({ deviceId: deviceId, HR: HR, MIN: MIN, DAYS: DAYS, DT: DT, ET: ET, TS: TS, DST: DST, DBS: DBS }));
                    return [4 /*yield*/, index_1.keystone.executeQuery(mutation_createTimerAndLdbWithDeviceId(), {
                            variables: {
                                deviceId: deviceId,
                                HR: HR,
                                MIN: MIN,
                                DAYS: DAYS,
                                DT: DT,
                                ET: ET,
                                TS: TS,
                                DST: DST,
                                DBS: DBS,
                            }
                        }).then(function (_a) {
                            var createHueTimer = _a.data.createHueTimer;
                            if (createHueTimer === null || createHueTimer === void 0 ? void 0 : createHueTimer.id) {
                                log("new timer created successfully -- " + JSON.stringify(createHueTimer));
                                return createHueTimer;
                            }
                            else {
                                log("new timer could not be crceated -- ");
                            }
                        }).catch(function (errors) {
                            log("Create timer query failed -- " + JSON.stringify(errors));
                            return undefined;
                        })
                        //LTO:  return newly created timer
                    ];
                case 1:
                    newTimer = _b.sent();
                    //LTO:  return newly created timer
                    return [2 /*return*/, newTimer];
            }
        });
    });
};

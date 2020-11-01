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
exports.mqttTimerLdbHandler = void 0;
var _a = require("../../util/constants"), MQTT_UPSTREAM_LDB_TS_SYNC_PAYLOAD = _a.MQTT_UPSTREAM_LDB_TS_SYNC_PAYLOAD, MQTT_DOWNSTREAM_TIMER_REQUEST_PAYLOAD = _a.MQTT_DOWNSTREAM_TIMER_REQUEST_PAYLOAD, MQTT_DOWNSTREAM_TIMER_PAYLOAD = _a.MQTT_DOWNSTREAM_TIMER_PAYLOAD, MQTT_UPSTREAM_TIMER_PAYLOAD = _a.MQTT_UPSTREAM_TIMER_PAYLOAD;
var Pindex_1 = require("../../Pindex");
var timerDbHelper_1 = require("../../services/dbHelper/timerDbHelper");
exports.mqttTimerLdbHandler = function (Mac, payload, _log) { return __awaiter(void 0, void 0, void 0, function () {
    var log, msgObj, msgObj;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                log = function (s) { _log && _log("[[ mqttTimerLdbHandler ]] " + s); };
                log("-- " + payload);
                if (!(msgObj === null || msgObj === void 0 ? void 0 : msgObj.cmd)) return [3 /*break*/, 4];
                if (!(msgObj.cmd == MQTT_UPSTREAM_LDB_TS_SYNC_PAYLOAD)) return [3 /*break*/, 2];
                log(">>>>");
                msgObj = JSON.parse(payload);
                return [4 /*yield*/, process_mqttUpstreamLdbPayload(Mac, msgObj, log)];
            case 1:
                _a.sent();
                return [3 /*break*/, 4];
            case 2:
                if (!(msgObj.cmd == MQTT_UPSTREAM_TIMER_PAYLOAD)) return [3 /*break*/, 4];
                log("<<<<");
                msgObj = JSON.parse(payload);
                return [4 /*yield*/, process_mqttUpstreamTimerPayload(Mac, msgObj, log)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [2 /*return*/, false];
        }
    });
}); };
/**
 * handles mqtt ldb payload in upstream
 * @param Mac
 * @param ldb
 * @param _log optional
 */
var process_mqttUpstreamLdbPayload = function (Mac, ldb, _log) { return __awaiter(void 0, void 0, void 0, function () {
    var log, timerFromQuery;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                log = function (s) { _log && _log("[[ process_mqttLdbUpstreamTsSyncPayload ]] " + s); };
                log(" -- " + JSON.stringify(ldb));
                if (!verify_mqttUpstreamLdbPayload(ldb)) return [3 /*break*/, 2];
                return [4 /*yield*/, timerDbHelper_1.findTimerWithMacAndDst({ Mac: Mac, DST: ldb.DST }, log)];
            case 1:
                timerFromQuery = _a.sent();
                if (timerFromQuery) {
                    if (ldb.TS && timerFromQuery.ldb.TS && ldb.TS > timerFromQuery.ldb.TS) {
                        log("Server timestamp outdated, requesting timer payload for DST : " + ldb.DST);
                        Pindex_1.publish("HUE/" + Mac + "/dn", JSON.stringify({
                            cmd: MQTT_DOWNSTREAM_TIMER_REQUEST_PAYLOAD,
                            TS: timerFromQuery.ldb.TS,
                            DST: timerFromQuery.ldb.DST,
                            DBS: timerFromQuery.ldb.DBS,
                        }));
                    }
                    else if ((ldb.TS && timerFromQuery.ldb.TS && ldb.TS < timerFromQuery.ldb.TS)) {
                        log("device timestamp outdated, publishing timer payload to device");
                        Pindex_1.publish("HUE/" + Mac + "/dn", JSON.stringify({
                            cmd: MQTT_DOWNSTREAM_TIMER_PAYLOAD,
                            HR: timerFromQuery.HR,
                            MIN: timerFromQuery.MIN,
                            DAYS: timerFromQuery.DAYS,
                            DT: timerFromQuery.DT,
                            ET: timerFromQuery.ET,
                            TS: timerFromQuery.ldb.TS,
                            DBS: timerFromQuery.ldb.DBS,
                            DST: timerFromQuery.ldb.DST,
                        }));
                    }
                    else if ((ldb.TS && timerFromQuery.ldb.TS && ldb.TS == timerFromQuery.ldb.TS)) {
                        log("server and device timestamp matched");
                    }
                }
                return [3 /*break*/, 3];
            case 2:
                log("payload parsing failed");
                _a.label = 3;
            case 3: return [2 /*return*/, true];
        }
    });
}); };
var verify_mqttUpstreamLdbPayload = function (timer) {
    //TODO DBS in device is set to 0
    if ((timer === null || timer === void 0 ? void 0 : timer.TS) && (timer === null || timer === void 0 ? void 0 : timer.DST))
        return true;
    return false;
};
/**
 *
 * @param Mac
 * @param timer
 * @param _log optional
 */
var process_mqttUpstreamTimerPayload = function (Mac, timer, _log) { return __awaiter(void 0, void 0, void 0, function () {
    var log, timerFromQuery, updatedTimerNLdb;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                log = function (s) { _log && _log("[[ process_mqttUpstreamTimerPayload ]] " + s); };
                log("");
                if (!verify_mqttUpstreamTimerPayload(timer)) return [3 /*break*/, 7];
                log("received timer DST " + timer.DST + " saving to DB");
                return [4 /*yield*/, timerDbHelper_1.findTimerWithMacAndDst({ Mac: Mac, DST: timer.DST }, log)];
            case 1:
                timerFromQuery = _a.sent();
                if (!timerFromQuery) return [3 /*break*/, 5];
                if (!(timer.TS && timerFromQuery.ldb.TS && timer.TS > timerFromQuery.ldb.TS)) return [3 /*break*/, 3];
                log("Server timestamp outdated saving new timer to DB: " + timer.DST);
                return [4 /*yield*/, timerDbHelper_1.updateTimerAndLdbWithId({
                        timerId: timerFromQuery.id,
                        HR: timer.HR,
                        MIN: timer.MIN,
                        DAYS: timer.DAYS,
                        DT: timer.DT,
                        ET: timer.ET,
                        LdbId: timerFromQuery.ldb.id,
                        TS: timer.TS,
                        DBS: timer.DBS
                    }, log)];
            case 2:
                updatedTimerNLdb = _a.sent();
                //TODO verify if timer updated
                if (updatedTimerNLdb) {
                    log('timer and ldb updated successfully -- ' + JSON.stringify(updatedTimerNLdb));
                }
                else {
                    log('timer and ldb update failed');
                }
                return [3 /*break*/, 4];
            case 3:
                if ((timer.TS && timerFromQuery.ldb.TS && timer.TS < timerFromQuery.ldb.TS)) {
                    log("device timestamp outdated, publishing timer payload to device for DST " + timer.DST);
                    //TODO send timer to device if device ts outdated
                }
                else if ((timer.TS && timerFromQuery.ldb.TS && timer.TS == timerFromQuery.ldb.TS)) {
                    log("server and device timestamp matched " + timer.DST);
                }
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                log("timer cannot be found to process, ignoring command");
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                log("timer parsing failed");
                _a.label = 8;
            case 8: return [2 /*return*/, true];
        }
    });
}); };
var verify_mqttUpstreamTimerPayload = function (timer) {
    if ((timer === null || timer === void 0 ? void 0 : timer.HR) && ((timer === null || timer === void 0 ? void 0 : timer.MIN) || (timer === null || timer === void 0 ? void 0 : timer.MIN) == 0) && (timer === null || timer === void 0 ? void 0 : timer.DT) && (timer === null || timer === void 0 ? void 0 : timer.ET) && (timer === null || timer === void 0 ? void 0 : timer.DAYS) && (timer === null || timer === void 0 ? void 0 : timer.TS) && (timer === null || timer === void 0 ? void 0 : timer.DST) /* && timer?.DBS */)
        return true;
    return false;
};
var process_mqttUpstreamTimeRequest = function (Mac, _log) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); };

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
//@ts-ignore
var _a = require("../../index"), keystone = _a.keystone, apps = _a.apps, HUE_TIMERS = _a.HUE_TIMERS;
var _b = require("../../util/constants"), MQTT_UPSTREAM_LDB_TS_SYNC_PAYLOAD = _b.MQTT_UPSTREAM_LDB_TS_SYNC_PAYLOAD, MQTT_DOWNSTREAM_TIMER_REQUEST_PAYLOAD = _b.MQTT_DOWNSTREAM_TIMER_REQUEST_PAYLOAD, MQTT_DOWNSTREAM_TIMER_PAYLOAD = _b.MQTT_DOWNSTREAM_TIMER_PAYLOAD, MQTT_UPSTREAM_TIMER_PAYLOAD = _b.MQTT_UPSTREAM_TIMER_PAYLOAD, logSectionStart = _b.logSectionStart, logSectionEnd = _b.logSectionEnd;
var _c = require("../../gql/gql"), updatetimerldbwithID = _c.updatetimerldbwithID, updateTimerwithId = _c.updateTimerwithId, createNewTimerForDeviceByMac = _c.createNewTimerForDeviceByMac, findHueTimerWithMACnLDB_DST = _c.findHueTimerWithMACnLDB_DST, gql_addProduct = _c.gql_addProduct, findProductWithMac = _c.findProductWithMac;
var publish = require("../../Pindex").publish;
var timerDbHelper_1 = require("../../services/dbHelper/timerDbHelper");
var _mqttTimerLdbHandler = function (topic, payload, _log) { return __awaiter(void 0, void 0, void 0, function () {
    var log, topicArray, msg, msgTimer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                log = function (s) { _log && _log("[[ mqttTimerLdbHandler ]]" + s); };
                topicArray = topic.split("/");
                if (!(topicArray.length >= 3)) return [3 /*break*/, 5];
                msg = JSON.parse(payload);
                if (!(msg.CMD == MQTT_UPSTREAM_LDB_TS_SYNC_PAYLOAD &&
                    msg.DST > 0 &&
                    msg.TS > 0)) return [3 /*break*/, 2];
                log("mqtt upstream ldb ts sync payload,  dst id :: " + msg.DST);
                return [4 /*yield*/, keystone
                        ///find product
                        .executeQuery(findProductWithMac, {
                        variables: { Mac: topicArray[1] },
                    })
                        //@ts-ignore
                        .then(function (_a) {
                        var products = _a.data.allHueProducts;
                        return __awaiter(void 0, void 0, void 0, function () {
                            var productFromDb;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!(products.length > 0)) return [3 /*break*/, 2];
                                        productFromDb = products[0];
                                        if (!productFromDb) return [3 /*break*/, 2];
                                        ///product found in DB
                                        log("<< PRODUCT FOUND IN QUERY >> -- " +
                                            JSON.stringify(productFromDb));
                                        ///find timer
                                        return [4 /*yield*/, keystone
                                                .executeQuery(findHueTimerWithMACnLDB_DST, {
                                                variables: {
                                                    Mac: topicArray[1],
                                                    DST: msg.DST,
                                                },
                                            })
                                                //@ts-ignore
                                                .then(function (_a) {
                                                var timers = _a.data.allHueTimers;
                                                return __awaiter(void 0, void 0, void 0, function () {
                                                    var timer, dbReq, timerPayload;
                                                    return __generator(this, function (_b) {
                                                        if (timers.length > 0) {
                                                            timer = timers[0];
                                                            if (timer) {
                                                                ///timer found
                                                                console.log("<< TIMER FOUND IN QUERY >>");
                                                                console.log(JSON.stringify(timer));
                                                                ///compare timestamp
                                                                if (msg.TS > timer.ldb.TS) {
                                                                    /// Device Timestam greater, Server timestamp outdated
                                                                    console.log("[[ FOUND SERVER TIMESTAMP OUTDATED ]]");
                                                                    console.log("SERVER TS : " +
                                                                        timer.ldb.TS +
                                                                        " , DEVICE TS : " +
                                                                        msg.TS);
                                                                    dbReq = {
                                                                        CMD: MQTT_DOWNSTREAM_TIMER_REQUEST_PAYLOAD,
                                                                        TS: timer.ldb.TS,
                                                                        DST: timer.ldb.DST,
                                                                        DBS: timer.ldb.DBS,
                                                                    };
                                                                    //@ts-ignore
                                                                    client.publish("HUE/" + topicArray[1] + "/dn", JSON.stringify(dbReq));
                                                                }
                                                                else if (msg.TS < timer.ldb.TS) {
                                                                    /// Device timestamp greater : Server Timestamp Outdated
                                                                    console.log("[[ FOUND DEVICE TIMESTAMP OUTDATED ]]");
                                                                    console.log("SERVER TS : " +
                                                                        timer.ldb.TS +
                                                                        " , DEVICE TS : " +
                                                                        msg.TS);
                                                                    timerPayload = {
                                                                        CMD: MQTT_DOWNSTREAM_TIMER_PAYLOAD,
                                                                        HR: timer.HR,
                                                                        MIN: timer.MIN,
                                                                        DAYS: timer.DAYS,
                                                                        DT: timer.DT,
                                                                        ET: timer.ET,
                                                                        TS: timer.ldb.TS,
                                                                        DBS: timer.ldb.DBS,
                                                                        DST: timer.ldb.DST,
                                                                    };
                                                                    //@ts-ignore
                                                                    client.publish("HUE/" + topicArray[1] + "/dn", JSON.stringify(timerPayload));
                                                                }
                                                                else if (msg.TS == timer.ldb.TS) {
                                                                    console.log("[[ FOUND MSG AND LOCALL TIMESTAMP AS SAME ]]");
                                                                    console.log("LOCAL TS : " + timer.ldb.TS + " , MSG TS : " + msg.TS);
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            /* /// No such timer exists */
                                                            log("[[NO TIMER FOUND IN QUERY FOR DST : " +
                                                                msg.DST +
                                                                " DEVICE " +
                                                                topicArray[1] +
                                                                " ]]\n adding new timer -- PRODUCT ID - " +
                                                                productFromDb.id);
                                                            //TODO add new timer with same
                                                            keystone
                                                                .executeQuery(createNewTimerForDeviceByMac, {
                                                                variables: {
                                                                    id: productFromDb.id,
                                                                    HR: 8,
                                                                    MIN: 30,
                                                                    DAYS: 1,
                                                                    DT: 1,
                                                                    ET: 1,
                                                                    TS: Math.floor(+new Date() / 1000),
                                                                    DST: msg.DST,
                                                                    DBS: msg.DBS,
                                                                },
                                                            })
                                                                //@ts-ignore
                                                                .then(function (data) {
                                                                if (data.data != undefined) {
                                                                    log("[[ NEW TIMER CREATED DST : " +
                                                                        msg.DST +
                                                                        " ]] - " +
                                                                        JSON.stringify(data.data));
                                                                }
                                                                else {
                                                                    log("[[ unknown error creating timer ]] -- DST : " +
                                                                        msg.DST +
                                                                        " -- " +
                                                                        JSON.stringify(data));
                                                                }
                                                            })
                                                                //@ts-ignore
                                                                .catch(function (err) {
                                                                log("[[ QUERY EXECUTION FAILED ]] error creating new timer -- " +
                                                                    JSON.stringify(err));
                                                            });
                                                        }
                                                        return [2 /*return*/];
                                                    });
                                                });
                                            })
                                                //@ts-ignore
                                                .catch(function (error) {
                                                /* ///Timer Filtered Search query failed */
                                                console.log("[[ SEARCH QUERY FAILED ]] >> ");
                                                console.log(error);
                                                console.log("\n\n");
                                            })];
                                    case 1:
                                        ///find timer
                                        _b.sent();
                                        _b.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        });
                    })
                        //@ts-ignore
                        .catch(function (err) {
                        console.log("[[ ERROR EXECUTING MAC FILTERED PRODUCT QUERY ]]");
                        console.log(JSON.stringify(err));
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 5];
            case 2:
                if (!(msg.CMD == MQTT_UPSTREAM_TIMER_PAYLOAD && msg.DST > 0)) return [3 /*break*/, 5];
                log("[[ [[ [[ UPSTREAM TIMER DATA ]] ]] ]] --- " + payload);
                msgTimer = {
                    HR: msg.HR,
                    MIN: msg.MIN,
                    DT: msg.DT,
                    ET: msg.ET,
                    DAYS: msg.DAYS,
                    TS: msg.TS,
                    DST: msg.DST,
                    DBS: msg.DBS,
                };
                if (!(msgTimer.HR > 0 &&
                    msgTimer.MIN != undefined &&
                    msgTimer.DT > 0 &&
                    msgTimer.ET > 0 &&
                    msgTimer.TS > 0 &&
                    msgTimer.DST > 0 &&
                    msgTimer.DBS > 0)) return [3 /*break*/, 4];
                log("timer Parsing successfull. DST : " + msgTimer.DST);
                //TODO check if timer exists
                //LTO:****************************************** */
                return [4 /*yield*/, keystone
                        .executeQuery(findHueTimerWithMACnLDB_DST, {
                        variables: {
                            Mac: topicArray[1],
                            DST: msgTimer.DST,
                        },
                    })
                        //@ts-ignore
                        .then(function (_a) {
                        var timers = _a.data.allHueTimers;
                        return __awaiter(void 0, void 0, void 0, function () {
                            var timer;
                            return __generator(this, function (_b) {
                                if (timers.length > 0) {
                                    timer = timers[0];
                                    if (timer.id != undefined && timer.ldb.id != undefined) {
                                        log("found timer in DB -- " + JSON.stringify(timer));
                                        if (timer.ldb.TS < msgTimer.TS) {
                                            log("[[ SERVER TIMESTAMP OUTDATED ]] -- Server timestamp : " +
                                                timer.ldb.TS +
                                                " , DEVICE timesatmp : " +
                                                msgTimer.TS +
                                                "\nsaving msgTimer to server DB DST : " +
                                                timer.ldb.DST);
                                            keystone
                                                .executeQuery(updateTimerwithId, {
                                                variables: {
                                                    id: timer.id,
                                                    HR: msgTimer.HR ? msgTimer.HR : undefined,
                                                    MIN: msgTimer.MIN,
                                                    DAYS: msgTimer.DAYS,
                                                    DT: msgTimer.DT,
                                                    ET: msgTimer.ET,
                                                },
                                            })
                                                //@ts-ignore
                                                .then(function (_a) {
                                                var res = _a.data.updateHueTimer;
                                                log("[[ TIMER UPDATED ]]  -- " + JSON.stringify(res));
                                                keystone
                                                    .executeQuery(updatetimerldbwithID, {
                                                    variables: {
                                                        id: timer.ldb.id,
                                                        TS: msgTimer.TS,
                                                        DST: msgTimer.DST,
                                                        DBS: msgTimer.DBS,
                                                    },
                                                })
                                                    //@ts-ignore
                                                    .then(function (_a) {
                                                    var data = _a.data;
                                                    log("[[ LDB UPDATED ]]" + JSON.stringify(data));
                                                })
                                                    //@ts-ignore
                                                    .catch(function (error) {
                                                    log("[[ LDB FAILED TO UPDATED BUT TIMER UPDATED ]] -- " +
                                                        JSON.stringify(error));
                                                });
                                            })
                                                //@ts-ignore
                                                .catch(function (error) {
                                                log("log error of update timer with id timer.id failed" +
                                                    JSON.stringify(error));
                                            });
                                        }
                                    }
                                }
                                else {
                                    //TODO No such timer found for device Mac topicArray[1] and DST msg.DST
                                }
                                return [2 /*return*/];
                            });
                        });
                    })
                        //@ts-ignore
                        .catch(function (err) {
                        log("query filtering respective timer failed");
                    })];
            case 3:
                //TODO check if timer exists
                //LTO:****************************************** */
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                //@ts-ignore
                log("timer parsing failed for DST : " + DST);
                _a.label = 5;
            case 5: return [2 /*return*/, false];
        }
    });
}); };
exports.mqttTimerLdbHandler = function (topic, payload, _log) { return __awaiter(void 0, void 0, void 0, function () {
    var log, topicArray, msgObj, Mac;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                log = function (s) { _log && _log("[[ mqttTimerLdbHandler ]] " + s); };
                log("");
                topicArray = topic.split("/");
                if (!(topicArray.length >= 3)) return [3 /*break*/, 7];
                msgObj = JSON.parse(payload);
                Mac = topicArray[1];
                if (!(msgObj === null || msgObj === void 0 ? void 0 : msgObj.CMD)) return [3 /*break*/, 5];
                if (!(msgObj.CMD == MQTT_UPSTREAM_LDB_TS_SYNC_PAYLOAD)) return [3 /*break*/, 2];
                return [4 /*yield*/, process_mqttUpstreamLdbPayload(Mac, msgObj, log)];
            case 1:
                _a.sent();
                return [3 /*break*/, 4];
            case 2:
                if (!(msgObj.CMD == MQTT_UPSTREAM_TIMER_PAYLOAD)) return [3 /*break*/, 4];
                return [4 /*yield*/, process_mqttUpstreamTimerPayload(Mac, msgObj, log)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                log("no command found in payload -- " + payload);
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                log("incorrect topic");
                _a.label = 8;
            case 8: return [2 /*return*/, false];
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
                        publish("HUE/" + Mac + "/dn", JSON.stringify({
                            CMD: MQTT_DOWNSTREAM_TIMER_REQUEST_PAYLOAD,
                            TS: timerFromQuery.ldb.TS,
                            DST: timerFromQuery.ldb.DST,
                            DBS: timerFromQuery.ldb.DBS,
                        }));
                    }
                    else if ((ldb.TS && timerFromQuery.ldb.TS && ldb.TS < timerFromQuery.ldb.TS)) {
                        log("device timestamp outdated, publishing timer payload to device");
                        publish("HUE/" + Mac + "/dn", JSON.stringify({
                            CMD: MQTT_DOWNSTREAM_TIMER_PAYLOAD,
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

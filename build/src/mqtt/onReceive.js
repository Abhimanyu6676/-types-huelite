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
exports.onMessage = exports.mqttOnMessageCallback = void 0;
//@ts-ignore
var _a = require("../index"), keystone = _a.keystone, apps = _a.apps, HUE_TIMERS = _a.HUE_TIMERS;
var _b = require("../util/constants"), MQTT_UPSTREAM_LDB_TS_SYNC_PAYLOAD = _b.MQTT_UPSTREAM_LDB_TS_SYNC_PAYLOAD, MQTT_DOWNSTREAM_TIMER_REQUEST_PAYLOAD = _b.MQTT_DOWNSTREAM_TIMER_REQUEST_PAYLOAD, MQTT_DOWNSTREAM_TIMER_PAYLOAD = _b.MQTT_DOWNSTREAM_TIMER_PAYLOAD, MQTT_UPSTREAM_TIMER_PAYLOAD = _b.MQTT_UPSTREAM_TIMER_PAYLOAD, logSectionStart = _b.logSectionStart, logSectionEnd = _b.logSectionEnd, log = _b.log;
var _c = require("../gql/gql"), updatetimerldbwithID = _c.updatetimerldbwithID, updateTimerwithId = _c.updateTimerwithId, createNewTimerForDeviceByMac = _c.createNewTimerForDeviceByMac, findHueTimerWithMACnLDB_DST = _c.findHueTimerWithMACnLDB_DST, gql_addProduct = _c.gql_addProduct, findProductWithMac = _c.findProductWithMac;
/**
 * @param (topic, payload)
 *
 *    `topic<String>` - mqtt message stream topic
 *    `payload<String>` - message data as string
 * if returned true call will not be farworded to rest of the array
 */
exports.mqttOnMessageCallback = [];
exports.onMessage = function (topic, payload) {
    mqLog("ON MQTT DATA pid : " + process.pid + ". payload : " + payload);
    exports.mqttOnMessageCallback.forEach(function (cb) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cb(topic, payload, function (s) { mqLog("[[ onMessage ]] " + s); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    mqLog("***********ON MQTT DATA***********");
};
var mqLog = function (s) {
    console.log('[[ MQTT ' + process.pid + ' ]]  ' + s);
};

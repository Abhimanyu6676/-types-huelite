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
exports.publish = void 0;
var express = require("express");
//@ts-ignore
var _a = require("./index"), keystone = _a.keystone, apps = _a.apps;
var mqtt = require("mqtt");
var log = require("./util/constants").log;
var onReceive_1 = require("./mqtt/onReceive");
var productDbHelper_1 = require("./services/dbHelper/productDbHelper");
var timerLdbMqttHandler_1 = require("./mqtt/mqttLdbHandlers/timerLdbMqttHandler");
keystone
    .prepare({
    apps: apps,
    dev: process.env.NODE_ENV !== "production",
})
    //@ts-ignore
    .then(function (_a) {
    var middlewares = _a.middlewares;
    return __awaiter(void 0, void 0, void 0, function () {
        var app, product;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, keystone.connect()];
                case 1:
                    _b.sent();
                    app = express();
                    app.use(middlewares).listen(4000);
                    //TODO add this to setup function
                    onReceive_1.mqttOnMessageCallback.push(timerLdbMqttHandler_1.mqttTimerLdbHandler);
                    return [4 /*yield*/, productDbHelper_1.findProductWithMac("BC:DD:C2:9D:30:156", function (s) { console.log("==>" + s); })];
                case 2:
                    product = _b.sent();
                    console.log("9999999999999--------------- " + JSON.stringify(product));
                    return [2 /*return*/];
            }
        });
    });
});
var client = mqtt.connect("mqtt://192.168.1.6");
client.on("connect", function () {
    client.subscribe("$share/group/HUE/+/up", { qos: 0 }, function () {
        console.log("Subscribed to wildcard topic");
    });
});
client.on("message", function (topic, message) {
    console.log("\n\nThis is client " + process.pid);
    onReceive_1.onMessage(topic, message);
});
exports.publish = function (topic, payload, qos) {
    if (qos === void 0) { qos = 0; }
    client.publish(topic, payload);
};

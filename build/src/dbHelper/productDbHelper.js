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
var keystone = require("../../index").keystone;
/**
 *
 *
 * @param Mac! - `required` mac Address of new Device
 * @param $Hostname optional
 * @param $IP optional
 * @param $groupName optional
 * @param $deviceName optional
 * @param $lastState optional
 *
 * @returns newly created Product {id, Mac, Hostname, deviceName, groupName, IP, lastState}
 */
var gql_addProduct = function () {
    return "\n    mutation(\n    $Mac: String!\n    $Hostname:String\n    $lastState:String\n    $groupName :String\n    $IP:String\n    $deviceName:String\n  ) {\n      createHueProduct(data: { \n        Mac: $Mac, \n        HostName:$Hostname, \n        groupName:$groupName, \n        lastState:$lastState,\n        IP:$IP,\n        deviceName:$deviceName\n      }) {\n        id\n        Mac\n        HostName\n        groupName\n        deviceName\n        IP\n        lastState\n      }\n    }";
};
/**
 *
 *
 * @param Mac! - `required` mac Address of new Device
 * @param $Hostname optional
 * @param $IP optional
 * @param $groupName optional
 * @param $deviceName optional
 * @param $lastState optional
 *
 * @returns newly created Product {id, Mac, Hostname, deviceName, groupName, IP, lastState}
 */
var _addNewProduct = function (_a) {
    var Mac = _a.Mac, _b = _a.Hostname, Hostname = _b === void 0 ? undefined : _b, _c = _a.IP, IP = _c === void 0 ? undefined : _c, _d = _a.groupName, groupName = _d === void 0 ? undefined : _d, _e = _a.deviceName, deviceName = _e === void 0 ? undefined : _e, _f = _a.lastState, lastState = _f === void 0 ? undefined : _f;
    return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, keystone.executeQuery(gql_addProduct(), {
                        variables: {
                            Mac: Mac,
                            IP: IP,
                            Hostname: Hostname,
                            groupName: groupName,
                            deviceName: deviceName,
                            lastState: lastState,
                        }
                    }).then(function (_a) {
                        var createHueProduct = _a.data.createHueProduct, errors = _a.errors;
                        if (!errors) {
                            console.log("product creation data -- " + JSON.stringify(createHueProduct));
                            resolve(createHueProduct);
                        }
                        else {
                            console.log("mutation could not be completed -- " + JSON.stringify(errors));
                            reject();
                        }
                    }).catch(function (error) {
                        console.log("product creation query failed -- " + JSON.stringify(error));
                        reject();
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
};
var addNewProduct = function (_a, log) {
    var Mac = _a.Mac, _b = _a.Hostname, Hostname = _b === void 0 ? undefined : _b, _c = _a.IP, IP = _c === void 0 ? undefined : _c, _d = _a.groupName, groupName = _d === void 0 ? undefined : _d, _e = _a.deviceName, deviceName = _e === void 0 ? undefined : _e, _f = _a.lastState, lastState = _f === void 0 ? undefined : _f;
    if (log === void 0) { log = undefined; }
    return __awaiter(void 0, void 0, void 0, function () {
        var k;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0: return [4 /*yield*/, keystone.executeQuery(gql_addProduct(), {
                        variables: {
                            Mac: Mac,
                            IP: IP,
                            Hostname: Hostname,
                            groupName: groupName,
                            deviceName: deviceName,
                            lastState: lastState,
                        }
                    }).then(function (_a) {
                        var createHueProduct = _a.data.createHueProduct, errors = _a.errors;
                        if (!errors) {
                            log && log("product creation successfull -- " + JSON.stringify(createHueProduct));
                            return createHueProduct;
                        }
                        else {
                            log && log("create new product " + Mac + " mutation could not be completed -- " + JSON.stringify(errors));
                            return undefined;
                        }
                    }).catch(function (error) {
                        log && log("product creation query failed -- " + JSON.stringify(error));
                        return undefined;
                    })];
                case 1:
                    k = _g.sent();
                    return [2 /*return*/, k];
            }
        });
    });
};
module.exports = { addNewProduct: addNewProduct };

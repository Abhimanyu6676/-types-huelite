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
exports.findUserWithEmail = exports.query_findUserWithEmail = void 0;
var index_1 = require("../../index");
/**
 * find specific hueTimer with LDB.DST and MAC
 *
 * @param Email emailID of user
 *
 * @returns query
 *
 */
exports.query_findUserWithEmail = function () {
    return "\n    query(\n        $email:String\n      ){\n        allUsers(where:{email:$email}, first:1){\n          id\n          userName\n          fbId\n          googleId\n          devices{\n            id\n            deviceName\n            Mac\n            groupName\n            lastState\n            IP\n            timers{\n              id\n              HR\n              MIN\n              DAYS\n              DT\n              ET\n              ldb{\n                id\n                TS\n                DST\n                DBS\n              }\n            }\n          }\n        }\n      }";
};
/**
 * find specific hueTimer with LDB.DST and MAC
 *
 * @param email emailID of user
 *
 * @returns Array of User: { userName, email, fbId, googleId}
 *
 */
exports.findUserWithEmail = function (_a, _log) {
    var email = _a.email;
    return __awaiter(void 0, void 0, void 0, function () {
        var log, user;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    log = function (s) { _log && _log("<findUserWithEmail> " + s); };
                    return [4 /*yield*/, index_1.keystone
                            .executeQuery(exports.query_findUserWithEmail(), {
                            variables: {
                                email: email
                            },
                        }).then(function (_a) {
                            var allUsers = _a.data.allUsers, errors = _a.errors;
                            //TODO verify data
                            log("user found -- " + JSON.stringify(allUsers));
                            if (allUsers === null || allUsers === void 0 ? void 0 : allUsers.length) {
                                return allUsers[0];
                            }
                            else {
                                log("no user found with email: " + email + " ---" + JSON.stringify(errors));
                                return undefined;
                            }
                        }).catch(function (err) {
                            log("User search with email failed -- " + JSON.stringify(err));
                            return undefined;
                        })];
                case 1:
                    user = _b.sent();
                    return [2 /*return*/, user];
            }
        });
    });
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
var googleAuth_1 = require("./googleAuth");
var hueAuth_1 = require("./HueAuth/hueAuth");
var express = require("express");
exports.AuthRouter = express.Router();
exports.AuthRouter.use("/hue", hueAuth_1.hueAuthRouter);
exports.AuthRouter.use("/google", googleAuth_1.googleAuthRouter);

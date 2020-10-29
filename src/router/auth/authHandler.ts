import { googleAuthRouter } from "./googleAuth";
import { hueAuthRouter } from "./HueAuth/hueAuth";

const express = require("express");
export var AuthRouter = express.Router();

AuthRouter.use("/hue", hueAuthRouter)
AuthRouter.use("/google", googleAuthRouter)
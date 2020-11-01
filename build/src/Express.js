"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Express = void 0;
var express = require("express");
var authHandler_1 = require("./router/auth/authHandler");
var bodyParser = require('body-parser');
//const app = express();
//const aedes = require("aedes");
//const mqttInstance = aedes();
//const logging = require("aedes-logging");
//const aedesPersistenceMongoDB = require("aedes-persistence-mongodb");
//const port = 1883;
//const mqttServer = require("net").createServer(mqttInstance.handle);
/* aedesPersistenceMongoDB({
  url: "mongodb://127.0.0.1/hue_mqtt", // Optional when you pass db object
  // Optional ttl settings
  ttl: {
    packets: 300, // Number of seconds
    subscriptions: 300,
  },
}); */
/* logging({
  instance: mqttInstance,
  servers: [mqttServer],
}); */
/* mqttServer.listen(port, function() {
  console.log("server started and listening on port ", port);
}); */
var Express = /** @class */ (function () {
    function Express() {
    }
    //@ts-ignore
    Express.prototype.prepareMiddleware = function (_a) {
        var keystone = _a.keystone, dev = _a.dev, distDir = _a.distDir;
        var app = express();
        app.set("base", "backend");
        app.set("keystone", keystone);
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        //@ts-ignore
        app.get("/backend/test", function (req, res) {
            res.send("Hello from **** HUElite!!");
        });
        app.use('/backend/auth', authHandler_1.AuthRouter);
        return app;
    };
    return Express;
}());
exports.Express = Express;

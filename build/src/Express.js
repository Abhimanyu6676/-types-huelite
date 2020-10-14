"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Express = void 0;
var express = require("express");
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
        //@ts-ignore
        app.get("/backend/test", function (req, res) {
            res.send("Hello from **** HUElite!!");
        });
        return app;
    };
    return Express;
}());
exports.Express = Express;

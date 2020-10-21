const express = require("express");
import { router as authRouter } from "./router/auth/auth";

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

export class Express {
  //@ts-ignore
  prepareMiddleware({ keystone, dev, distDir }) {
    const app = express();
    app.set("base", "backend");
    app.set("keystone", keystone);

    //@ts-ignore
    app.get("/backend/test", function (req, res) {
      res.send("Hello from **** HUElite!!");
    });

    app.use('/backend/auth', authRouter)

    return app;
  }
}

const express = require("express");
//@ts-ignore
const { keystone, apps } = require("./index");
var mqtt = require("mqtt");
const { log } = require("./util/constants");
import { onMessage, mqttOnMessageCallback, mqLog_t } from "./mqtt/onReceive";
import { addNewProduct, findProductWithMac } from "./services/dbHelper/productDbHelper";
import { mqttTimerLdbHandler } from "./mqtt/mqttLdbHandlers/timerLdbMqttHandler";
import { HUE_TIMERS } from ".";
import { mqttTimeHandler } from "./mqtt/mqttTimeHandler";

keystone
  .prepare({
    apps: apps,
    dev: process.env.NODE_ENV !== "production",
  })
  //@ts-ignore
  .then(async ({ middlewares }) => {
    await keystone.connect();
    const app = express();
    app.use(middlewares).listen(4000);
    //TODO add this to setup function
    mqttOnMessageCallback.push(mqttTimerLdbHandler);
    mqttOnMessageCallback.push(mqttTimeHandler)


    /*   const { adapter } = HUE_TIMERS;
      const timer = await adapter.find({ HR: 12 });
      console.log("---------------------- ");
      console.log("---------------------- " + JSON.stringify(timer)); */
  });



const client = mqtt.connect("mqtt://192.168.1.6");

client.on("connect", function () {

  client.subscribe("$share/group/HUE/+/up", { qos: 0 }, () => {
    console.log("Subscribed to wildcard topic");
  });


});


client.on("message", (topic: string, message: string) => {
  onMessage(topic, message, mqLog);
});

type publish_t = (topic: string, payload: string, qos?: number) => void
export const publish: publish_t = (topic, payload, qos = 0) => {
  client.publish(topic, payload);
}



const mqLog: mqLog_t = (s) => {
  if (true) console.log('[[ MQTT ' + process.pid + ' ]]  ' + s);
}

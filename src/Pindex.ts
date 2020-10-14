const express = require("express");
//@ts-ignore
const { keystone, apps } = require("./index");
var mqtt = require("mqtt");
const { log } = require("./util/constants");
import { onMessage, mqttOnMessageCallback } from "./mqtt/onReceive";
import { addNewProduct, findProductWithMac } from "./services/dbHelper/productDbHelper";
import { mqttTimerLdbHandler } from "./mqtt/mqttLdbHandlers/timerLdbMqttHandler";

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

    const product = await findProductWithMac("BC:DD:C2:9D:30:156", (s) => { console.log("==>" + s); })

    console.log("9999999999999--------------- " + JSON.stringify(product))
  });



const client = mqtt.connect("mqtt://192.168.1.6");

client.on("connect", function () {

  client.subscribe("$share/group/HUE/+/up", { qos: 0 }, () => {
    console.log("Subscribed to wildcard topic");
  });


});


client.on("message", (topic: string, message: string) => {
  console.log("\n\nThis is client " + process.pid);
  onMessage(topic, message);
});

type publish_t = (topic: string, payload: string, qos?: number) => void
export const publish: publish_t = (topic, payload, qos = 0) => {
  client.publish(topic, payload);
}

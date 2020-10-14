"use strict";
var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://192.168.1.6");
client.subscribe("TestTopic", [], function () {
    console.log("Subscribed to test topic");
});
client.subscribe("test/+/up", [], function () {
    console.log("Subscribed to wildcard topic");
});
client.subscribe("HUE/+/up", [], function () {
    console.log("Subscribed to wildcard topic");
});
client.on("connect", function () {
    client.subscribe("presence", function (err) {
        if (!err) {
            client.publish("presence", "Hello mqtt");
        }
    });
});
client.on("message", function (topic, message) {
    // message is Buffer
    var topicArray = topic.split("/");
    if (topicArray.length >= 3) {
        console.log(" topics are\n");
        for (var i = 0; i < topicArray.length; i++) {
            console.log(topicArray[i]);
        }
    }
    console.log(message.toString());
});

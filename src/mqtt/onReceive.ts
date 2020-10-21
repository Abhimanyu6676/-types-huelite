import { logFun_t } from "..";

export type mqLog_t = (s: string) => void;
export const mqttOnMessageCallback: mqttOnMessageCallback_t[] = [];
export type mqttOnMessageCallback_t = (Mac: string, payload: string, log?: mqLog_t) => Promise<boolean>;


/** 
 * @param (topic, payload)
 * 
 *    `topic<String>` - mqtt message stream topic
 *    `payload<String>` - message data as string
 * if returned true call will not be farworded to rest of the array
 */
export const onMessage = (topic: string, payload: string, mqLog: mqLog_t) => {
  const log: logFun_t = (s) => {
    mqLog("[[ onMessage ]] " + s)
  }
  log("ON MQTT DATA pid : " + process.pid + ". payload : " + payload);
  var topicArray = topic.split("/");
  if (topicArray.length >= 3) {
    var Mac = topicArray[1]
    mqttOnMessageCallback.forEach(async cb => {
      await cb(Mac, payload, log)
    });
  }
  log("***********ON MQTT DATA***********");
}




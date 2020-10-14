//@ts-ignore
const { keystone, apps, HUE_TIMERS } = require("../index");
const {
  MQTT_UPSTREAM_LDB_TS_SYNC_PAYLOAD,
  MQTT_DOWNSTREAM_TIMER_REQUEST_PAYLOAD,
  MQTT_DOWNSTREAM_TIMER_PAYLOAD,
  MQTT_UPSTREAM_TIMER_PAYLOAD,
  logSectionStart,
  logSectionEnd,
  log,
} = require("../util/constants");
const {
  updatetimerldbwithID,
  updateTimerwithId,
  createNewTimerForDeviceByMac,
  findHueTimerWithMACnLDB_DST,
  gql_addProduct,
  findProductWithMac
} = require("../gql/gql")

export type mqLog_t = (s: string) => void;
export type mqttOnMessageCallback_t = (topic: string, payload: string, log?: mqLog_t) => Promise<boolean>;


/** 
 * @param (topic, payload)
 * 
 *    `topic<String>` - mqtt message stream topic
 *    `payload<String>` - message data as string
 * if returned true call will not be farworded to rest of the array
 */
export const mqttOnMessageCallback: mqttOnMessageCallback_t[] = [];


export const onMessage = (topic: string, payload: string) => {
  mqLog("ON MQTT DATA pid : " + process.pid + ". payload : " + payload);
  mqttOnMessageCallback.forEach(async cb => {
    await cb(topic, payload, (s) => { mqLog("[[ onMessage ]] " + s); })
  });
  mqLog("***********ON MQTT DATA***********");
}



const mqLog: mqLog_t = (s) => {
  console.log('[[ MQTT ' + process.pid + ' ]]  ' + s);
}
"use strict";
var fs = require("fs");
/** [[ SEC ]] -- MQTT CMD
 * @NOTE: keep in sync with SWAGGER DATA TYPE --> '#/components/enums/MQTT_CMDs'
 */
var MQTT_DOWNSTREAM_TIMER_REQUEST_PAYLOAD = "00MQ_DNS_DB_REQ"; /**  Command in downstream for LDB DATA Request */
var MQTT_DOWNSTREAM_TIMER_PAYLOAD = "00MQ_DNS_TMR_PL"; /** Command in downstream for respective LDB Timer DATA payload  */
var MQTT_UPSTREAM_TIMER_PAYLOAD = "00MQ_UPS_TMR_PL"; /** Command in upstream for respective LDB Timer DATA Payload  */
var MQTT_UPSTREAM_LDB_TS_SYNC_PAYLOAD = "00MQ_UPS_LDB_PL"; /** Command in upstream for LDB timestamp sync payload */
/// [[ SECTION END ]] -- MQTT CMD
var logSectionStart = function (funName) {
    log("\n\n\n\n\n----------------------------------" +
        funName +
        "----------------------------------");
};
var logSectionEnd = function (funName) {
    log("\n<<<<<<<<<<<<<<<<<<<<<<<<<<[[ " +
        funName +
        " ]]>>>>>>>>>>>>>>>>>>>>>>>>>>\n");
};
var log = function (s) {
    fs.appendFile("mqLog.txt", "\n" + s, function (err) {
        if (err)
            throw err;
        //console.log("Saved!");
    });
};
module.exports = {
    MQTT_DOWNSTREAM_TIMER_REQUEST_PAYLOAD: MQTT_DOWNSTREAM_TIMER_REQUEST_PAYLOAD,
    MQTT_DOWNSTREAM_TIMER_PAYLOAD: MQTT_DOWNSTREAM_TIMER_PAYLOAD,
    MQTT_UPSTREAM_TIMER_PAYLOAD: MQTT_UPSTREAM_TIMER_PAYLOAD,
    MQTT_UPSTREAM_LDB_TS_SYNC_PAYLOAD: MQTT_UPSTREAM_LDB_TS_SYNC_PAYLOAD,
    logSectionStart: logSectionStart,
    logSectionEnd: logSectionEnd,
    log: log,
};

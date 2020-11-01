"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MQTT_DOWNSTREAM_TIME_PAYLOAD = exports.MQTT_UPSTREAM_TIME_REQUEST = exports.MQTT_UPSTREAM_LDB_TS_SYNC_PAYLOAD = exports.MQTT_UPSTREAM_TIMER_PAYLOAD = exports.MQTT_DOWNSTREAM_TIMER_PAYLOAD = exports.MQTT_DOWNSTREAM_TIMER_REQUEST_PAYLOAD = void 0;
var fs = require("fs");
/** [[ SEC ]] -- MQTT CMD
 * @NOTE: keep in sync with SWAGGER DATA TYPE --> '#/components/enums/MQTT_CMDs'
 */
exports.MQTT_DOWNSTREAM_TIMER_REQUEST_PAYLOAD = "00MQ_DNS_DB_REQ"; /**  Command in downstream for LDB DATA Request */
exports.MQTT_DOWNSTREAM_TIMER_PAYLOAD = "00MQ_DNS_TMR_PL"; /** Command in downstream for respective LDB Timer DATA payload  */
exports.MQTT_UPSTREAM_TIMER_PAYLOAD = "00MQ_UPS_TMR_PL"; /** Command in upstream for respective LDB Timer DATA Payload  */
exports.MQTT_UPSTREAM_LDB_TS_SYNC_PAYLOAD = "00MQ_UPS_LDB_PL"; /** Command in upstream for LDB timestamp sync payload */
exports.MQTT_UPSTREAM_TIME_REQUEST = "000MQ_UPS_TM_RQ"; /** Command in upstream for time request */
exports.MQTT_DOWNSTREAM_TIME_PAYLOAD = "000MQ_DNS_TM_PL"; /** Command in upstream for time request */
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
    logSectionStart: logSectionStart,
    logSectionEnd: logSectionEnd,
    log: log,
};

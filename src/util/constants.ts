var fs = require("fs");

/** [[ SEC ]] -- MQTT CMD
 * @NOTE: keep in sync with SWAGGER DATA TYPE --> '#/components/enums/MQTT_CMDs'
 */
export const MQTT_DOWNSTREAM_TIMER_REQUEST_PAYLOAD = "00MQ_DNS_DB_REQ"; /**  Command in downstream for LDB DATA Request */
export const MQTT_DOWNSTREAM_TIMER_PAYLOAD = "00MQ_DNS_TMR_PL"; /** Command in downstream for respective LDB Timer DATA payload  */
export const MQTT_UPSTREAM_TIMER_PAYLOAD = "00MQ_UPS_TMR_PL"; /** Command in upstream for respective LDB Timer DATA Payload  */
export const MQTT_UPSTREAM_LDB_TS_SYNC_PAYLOAD = "00MQ_UPS_LDB_PL"; /** Command in upstream for LDB timestamp sync payload */
export const MQTT_UPSTREAM_TIME_REQUEST = "000MQ_UPS_TM_RQ"; /** Command in upstream for time request */
export const MQTT_DOWNSTREAM_TIME_PAYLOAD = "000MQ_DNS_TM_PL"; /** Command in upstream for time request */
/// [[ SECTION END ]] -- MQTT CMD

const logSectionStart = (funName: string) => {
  log(
    "\n\n\n\n\n----------------------------------" +
    funName +
    "----------------------------------"
  );
};

const logSectionEnd = (funName: string) => {
  log(
    "\n<<<<<<<<<<<<<<<<<<<<<<<<<<[[ " +
    funName +
    " ]]>>>>>>>>>>>>>>>>>>>>>>>>>>\n"
  );
};

const log = (s: string) => {
  fs.appendFile("mqLog.txt", "\n" + s, function (err: any) {
    if (err) throw err;
    //console.log("Saved!");
  });
};

module.exports = {
  logSectionStart,
  logSectionEnd,
  log,
};

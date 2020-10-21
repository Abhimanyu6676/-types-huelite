import { publish } from "../Pindex";
import { MQTT_DOWNSTREAM_TIME_PAYLOAD } from "../util/constants";
import { mqttOnMessageCallback_t } from "./onReceive";

/**
 * handles mqtt ldb payload in upstream
 * @param Mac 
 * @param ldb 
 * @param _log optional 
 */
export const mqttTimeHandler: mqttOnMessageCallback_t = async (Mac, payload, _log) => {
    const log = (s: string) => { _log && _log("[[ mqttTimerLdbHandler ]] " + s); }
    log(" Mac -- " + Mac);
    if (payload == "get_time") {
        var timeObj = {
            cmd: "000MQ_DNS_TM_PL",
            time: Date.now(),
        }
        log(JSON.stringify(timeObj))
        publish("HUE/" + Mac + "/dn", JSON.stringify(timeObj))
        return true;
    }
    return false;
};
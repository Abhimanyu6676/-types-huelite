
const {
    MQTT_UPSTREAM_LDB_TS_SYNC_PAYLOAD,
    MQTT_DOWNSTREAM_TIMER_REQUEST_PAYLOAD,
    MQTT_DOWNSTREAM_TIMER_PAYLOAD,
    MQTT_UPSTREAM_TIMER_PAYLOAD,
} = require("../../util/constants");

import { logFun_t } from "../../index";
import { publish } from "../../Pindex";
import { findTimerWithMacAndDst, updateTimerAndLdbWithId } from "../../services/dbHelper/timerDbHelper";
import { mqttOnMessageCallback_t } from "../onReceive";

export const mqttTimerLdbHandler: mqttOnMessageCallback_t = async (Mac, payload, _log) => {
    const log = (s: string) => { _log && _log("[[ mqttTimerLdbHandler ]] " + s); }
    log("-- " + payload);
    if (msgObj?.cmd) {
        if (msgObj.cmd == MQTT_UPSTREAM_LDB_TS_SYNC_PAYLOAD) {
            log(">>>>")
            var msgObj = JSON.parse(payload);
            await process_mqttUpstreamLdbPayload(Mac, msgObj, log)
        } else if (msgObj.cmd == MQTT_UPSTREAM_TIMER_PAYLOAD) {
            log("<<<<")
            var msgObj = JSON.parse(payload);
            await process_mqttUpstreamTimerPayload(Mac, msgObj, log)
        }
    }
    return false;
};

/**
 * handles mqtt ldb payload in upstream
 * @param Mac 
 * @param ldb 
 * @param _log optional 
 */
const process_mqttUpstreamLdbPayload: (Mac: string, ldb: mqttUpstreamLdbPayload_i, _log?: logFun_t) => Promise<boolean> = async (Mac, ldb, _log) => {
    const log = (s: string) => { _log && _log("[[ process_mqttLdbUpstreamTsSyncPayload ]] " + s); }
    log(" -- " + JSON.stringify(ldb));
    if (verify_mqttUpstreamLdbPayload(ldb)) {
        //@ts-ignore
        const timerFromQuery = await findTimerWithMacAndDst({ Mac, DST: ldb.DST }, log)
        if (timerFromQuery) {
            if (ldb.TS && timerFromQuery.ldb.TS && ldb.TS > timerFromQuery.ldb.TS) {
                log("Server timestamp outdated, requesting timer payload for DST : " + ldb.DST)
                publish(
                    "HUE/" + Mac + "/dn",
                    JSON.stringify({
                        cmd: MQTT_DOWNSTREAM_TIMER_REQUEST_PAYLOAD,
                        TS: timerFromQuery.ldb.TS,
                        DST: timerFromQuery.ldb.DST,
                        DBS: timerFromQuery.ldb.DBS,
                    })
                );
            } else if ((ldb.TS && timerFromQuery.ldb.TS && ldb.TS < timerFromQuery.ldb.TS)) {
                log("device timestamp outdated, publishing timer payload to device");
                publish("HUE/" + Mac + "/dn", JSON.stringify({
                    cmd: MQTT_DOWNSTREAM_TIMER_PAYLOAD,
                    HR: timerFromQuery.HR,
                    MIN: timerFromQuery.MIN,
                    DAYS: timerFromQuery.DAYS,
                    DT: timerFromQuery.DT,
                    ET: timerFromQuery.ET,
                    TS: timerFromQuery.ldb.TS,
                    DBS: timerFromQuery.ldb.DBS,
                    DST: timerFromQuery.ldb.DST,
                }));
            } else if ((ldb.TS && timerFromQuery.ldb.TS && ldb.TS == timerFromQuery.ldb.TS)) {
                log("server and device timestamp matched");
            }
        }

    } else {
        log("payload parsing failed")
    }
    return true;
};

const verify_mqttUpstreamLdbPayload: (timer: mqttUpstreamLdbPayload_i) => boolean = (timer) => {
    //TODO DBS in device is set to 0
    if (timer?.TS && timer?.DST)
        return true;
    return false;
}

interface mqttUpstreamLdbPayload_i {
    TS?: number,
    DBS?: number,
    DST?: number
}

/**
 * 
 * @param Mac 
 * @param timer 
 * @param _log optional 
 */
const process_mqttUpstreamTimerPayload: (Mac: string, timer: mqttUpstreamTimerPayload_i, _log?: logFun_t) => Promise<boolean> = async (Mac, timer, _log) => {
    const log = (s: string) => { _log && _log("[[ process_mqttUpstreamTimerPayload ]] " + s); }
    log("")
    if (verify_mqttUpstreamTimerPayload(timer)) {
        log("received timer DST " + timer.DST + " saving to DB")
        //@ts-ignore
        const timerFromQuery = await findTimerWithMacAndDst({ Mac, DST: timer.DST }, log)
        if (timerFromQuery) {
            if (timer.TS && timerFromQuery.ldb.TS && timer.TS > timerFromQuery.ldb.TS) {
                log("Server timestamp outdated saving new timer to DB: " + timer.DST)
                const updatedTimerNLdb = await updateTimerAndLdbWithId({
                    timerId: timerFromQuery.id,
                    HR: timer.HR,
                    MIN: timer.MIN,
                    DAYS: timer.DAYS,
                    DT: timer.DT,
                    ET: timer.ET,
                    LdbId: timerFromQuery.ldb.id,
                    TS: timer.TS,
                    DBS: timer.DBS
                }, log);
                //TODO verify if timer updated
                if (updatedTimerNLdb) {
                    log('timer and ldb updated successfully -- ' + JSON.stringify(updatedTimerNLdb))
                } else {
                    log('timer and ldb update failed')
                }
            } else if ((timer.TS && timerFromQuery.ldb.TS && timer.TS < timerFromQuery.ldb.TS)) {
                log("device timestamp outdated, publishing timer payload to device for DST " + timer.DST);
                //TODO send timer to device if device ts outdated

            } else if ((timer.TS && timerFromQuery.ldb.TS && timer.TS == timerFromQuery.ldb.TS)) {
                log("server and device timestamp matched " + timer.DST);
            }





        } else {
            log("timer cannot be found to process, ignoring command")
        }
        //TODO copy code from LTO section
    } else {
        log("timer parsing failed")
    }
    return true;
}

const verify_mqttUpstreamTimerPayload: (timer: mqttUpstreamTimerPayload_i) => boolean = (timer) => {
    if (timer?.HR && (timer?.MIN || timer?.MIN == 0) && timer?.DT && timer?.ET && timer?.DAYS && timer?.TS && timer?.DST  /* && timer?.DBS */)
        return true;
    return false;
}

interface mqttUpstreamTimerPayload_i {
    HR: number,
    MIN: number,
    DT: number,
    ET: number,
    DAYS: number,
    TS: number,
    DBS: number,
    DST: number
}

const process_mqttUpstreamTimeRequest: (Mac: string, _log?: logFun_t) => void = async (Mac, _log) => {

}
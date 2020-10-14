//@ts-ignore
const { keystone, apps, HUE_TIMERS } = require("../../index");
const {
    MQTT_UPSTREAM_LDB_TS_SYNC_PAYLOAD,
    MQTT_DOWNSTREAM_TIMER_REQUEST_PAYLOAD,
    MQTT_DOWNSTREAM_TIMER_PAYLOAD,
    MQTT_UPSTREAM_TIMER_PAYLOAD,
    logSectionStart,
    logSectionEnd,
} = require("../../util/constants");
const {
    updatetimerldbwithID,
    updateTimerwithId,
    createNewTimerForDeviceByMac,
    findHueTimerWithMACnLDB_DST,
    gql_addProduct,
    findProductWithMac
} = require("../../gql/gql")

import { logFun_t } from "../..";
import { publish } from "../../Pindex";
import { findTimerWithMacAndDst } from "../../services/dbHelper/timerDbHelper";
import { mqttOnMessageCallback_t } from "../onReceive";

const _mqttTimerLdbHandler: mqttOnMessageCallback_t = async (topic, payload, _log) => {
    const log = (s: string) => { _log && _log("[[ mqttTimerLdbHandler ]]" + s); }
    var topicArray = topic.split("/");
    if (topicArray.length >= 3) {
        var msg = JSON.parse(payload);
        if (
            msg.CMD == MQTT_UPSTREAM_LDB_TS_SYNC_PAYLOAD &&
            msg.DST > 0 &&
            msg.TS > 0
        ) {
            log("mqtt upstream ldb ts sync payload,  dst id :: " + msg.DST);
            await keystone
                ///find product
                .executeQuery(findProductWithMac, {
                    variables: { Mac: topicArray[1] },
                })
                //@ts-ignore
                .then(async ({ data: { allHueProducts: products } }) => {
                    if (products.length > 0) {
                        var productFromDb = products[0];
                        if (productFromDb) {
                            ///product found in DB
                            log(
                                "<< PRODUCT FOUND IN QUERY >> -- " +
                                JSON.stringify(productFromDb)
                            );
                            ///find timer
                            await keystone
                                .executeQuery(findHueTimerWithMACnLDB_DST, {
                                    variables: {
                                        Mac: topicArray[1],
                                        DST: msg.DST,
                                    },
                                })
                                //@ts-ignore
                                .then(async ({ data: { allHueTimers: timers } }) => {
                                    if (timers.length > 0) {
                                        var timer = timers[0];
                                        if (timer) {
                                            ///timer found
                                            console.log("<< TIMER FOUND IN QUERY >>");
                                            console.log(JSON.stringify(timer));
                                            ///compare timestamp
                                            if (msg.TS > timer.ldb.TS) {
                                                /// Device Timestam greater, Server timestamp outdated
                                                console.log("[[ FOUND SERVER TIMESTAMP OUTDATED ]]");
                                                console.log(
                                                    "SERVER TS : " +
                                                    timer.ldb.TS +
                                                    " , DEVICE TS : " +
                                                    msg.TS
                                                );
                                                //TODO request latest timer LDB
                                                var dbReq = {
                                                    CMD: MQTT_DOWNSTREAM_TIMER_REQUEST_PAYLOAD,
                                                    TS: timer.ldb.TS,
                                                    DST: timer.ldb.DST,
                                                    DBS: timer.ldb.DBS,
                                                };
                                                //@ts-ignore
                                                client.publish(
                                                    "HUE/" + topicArray[1] + "/dn",
                                                    JSON.stringify(dbReq)
                                                );
                                            } else if (msg.TS < timer.ldb.TS) {
                                                /// Device timestamp greater : Server Timestamp Outdated
                                                console.log("[[ FOUND DEVICE TIMESTAMP OUTDATED ]]");
                                                console.log(
                                                    "SERVER TS : " +
                                                    timer.ldb.TS +
                                                    " , DEVICE TS : " +
                                                    msg.TS
                                                );
                                                var timerPayload = {
                                                    CMD: MQTT_DOWNSTREAM_TIMER_PAYLOAD,
                                                    HR: timer.HR,
                                                    MIN: timer.MIN,
                                                    DAYS: timer.DAYS,
                                                    DT: timer.DT,
                                                    ET: timer.ET,
                                                    TS: timer.ldb.TS,
                                                    DBS: timer.ldb.DBS,
                                                    DST: timer.ldb.DST,
                                                };
                                                //@ts-ignore
                                                client.publish(
                                                    "HUE/" + topicArray[1] + "/dn",
                                                    JSON.stringify(timerPayload)
                                                );
                                            } else if (msg.TS == timer.ldb.TS) {
                                                console.log(
                                                    "[[ FOUND MSG AND LOCALL TIMESTAMP AS SAME ]]"
                                                );
                                                console.log(
                                                    "LOCAL TS : " + timer.ldb.TS + " , MSG TS : " + msg.TS
                                                );
                                            }
                                        }
                                    } else {
                                        /* /// No such timer exists */
                                        log(
                                            "[[NO TIMER FOUND IN QUERY FOR DST : " +
                                            msg.DST +
                                            " DEVICE " +
                                            topicArray[1] +
                                            " ]]\n adding new timer -- PRODUCT ID - " +
                                            productFromDb.id
                                        );
                                        //TODO add new timer with same
                                        keystone
                                            .executeQuery(createNewTimerForDeviceByMac, {
                                                variables: {
                                                    id: productFromDb.id,
                                                    HR: 8,
                                                    MIN: 30,
                                                    DAYS: 1,
                                                    DT: 1,
                                                    ET: 1,
                                                    TS: Math.floor(+new Date() / 1000),
                                                    DST: msg.DST,
                                                    DBS: msg.DBS,
                                                },
                                            })
                                            //@ts-ignore
                                            .then((data) => {
                                                if (data.data != undefined) {
                                                    log(
                                                        "[[ NEW TIMER CREATED DST : " +
                                                        msg.DST +
                                                        " ]] - " +
                                                        JSON.stringify(data.data)
                                                    );
                                                } else {
                                                    log(
                                                        "[[ unknown error creating timer ]] -- DST : " +
                                                        msg.DST +
                                                        " -- " +
                                                        JSON.stringify(data)
                                                    );
                                                }
                                            })
                                            //@ts-ignore
                                            .catch((err) => {
                                                log(
                                                    "[[ QUERY EXECUTION FAILED ]] error creating new timer -- " +
                                                    JSON.stringify(err)
                                                );
                                            });
                                    }
                                })
                                //@ts-ignore
                                .catch((error) => {
                                    /* ///Timer Filtered Search query failed */
                                    console.log("[[ SEARCH QUERY FAILED ]] >> ");
                                    console.log(error);
                                    console.log("\n\n");
                                });
                        }
                    }
                })
                //@ts-ignore
                .catch((err) => {
                    console.log("[[ ERROR EXECUTING MAC FILTERED PRODUCT QUERY ]]");
                    console.log(JSON.stringify(err));
                });
        } else if (msg.CMD == MQTT_UPSTREAM_TIMER_PAYLOAD && msg.DST > 0) {



            //LTO:****************************************** */
            log("[[ [[ [[ UPSTREAM TIMER DATA ]] ]] ]] --- " + payload);
            var msgTimer = {
                HR: msg.HR,
                MIN: msg.MIN,
                DT: msg.DT,
                ET: msg.ET,
                DAYS: msg.DAYS,
                TS: msg.TS,
                DST: msg.DST,
                DBS: msg.DBS,
            };
            if (
                msgTimer.HR > 0 &&
                msgTimer.MIN != undefined &&
                msgTimer.DT > 0 &&
                msgTimer.ET > 0 &&
                msgTimer.TS > 0 &&
                msgTimer.DST > 0 &&
                msgTimer.DBS > 0
            ) {
                log("timer Parsing successfull. DST : " + msgTimer.DST);
                //TODO check if timer exists
                await keystone
                    .executeQuery(findHueTimerWithMACnLDB_DST, {
                        variables: {
                            Mac: topicArray[1],
                            DST: msgTimer.DST,
                        },
                    })
                    //@ts-ignore
                    .then(async ({ data: { allHueTimers: timers } }) => {
                        if (timers.length > 0) {
                            var timer = timers[0];
                            if (timer.id != undefined && timer.ldb.id != undefined) {
                                log("found timer in DB -- " + JSON.stringify(timer));
                                if (timer.ldb.TS < msgTimer.TS) {
                                    log(
                                        "[[ SERVER TIMESTAMP OUTDATED ]] -- Server timestamp : " +
                                        timer.ldb.TS +
                                        " , DEVICE timesatmp : " +
                                        msgTimer.TS +
                                        "\nsaving msgTimer to server DB DST : " +
                                        timer.ldb.DST
                                    );
                                    keystone
                                        .executeQuery(updateTimerwithId, {
                                            variables: {
                                                id: timer.id,
                                                HR: msgTimer.HR ? msgTimer.HR : undefined,
                                                MIN: msgTimer.MIN,
                                                DAYS: msgTimer.DAYS,
                                                DT: msgTimer.DT,
                                                ET: msgTimer.ET,
                                            },
                                        })
                                        //@ts-ignore
                                        .then(({ data: { updateHueTimer: res } }) => {
                                            log("[[ TIMER UPDATED ]]  -- " + JSON.stringify(res));
                                            keystone
                                                .executeQuery(updatetimerldbwithID, {
                                                    variables: {
                                                        id: timer.ldb.id,
                                                        TS: msgTimer.TS,
                                                        DST: msgTimer.DST,
                                                        DBS: msgTimer.DBS,
                                                    },
                                                })
                                                //@ts-ignore
                                                .then(({ data }) => {
                                                    log("[[ LDB UPDATED ]]" + JSON.stringify(data));
                                                })
                                                //@ts-ignore
                                                .catch((error) => {
                                                    log(
                                                        "[[ LDB FAILED TO UPDATED BUT TIMER UPDATED ]] -- " +
                                                        JSON.stringify(error)
                                                    );
                                                });
                                        })
                                        //@ts-ignore
                                        .catch((error) => {
                                            log(
                                                "log error of update timer with id timer.id failed" +
                                                JSON.stringify(error)
                                            );
                                        });
                                }
                            }
                        } else {
                            //TODO No such timer found for device Mac topicArray[1] and DST msg.DST
                        }
                    })
                    //@ts-ignore
                    .catch((err) => {
                        log("query filtering respective timer failed");
                    });
            } else {
                //@ts-ignore
                log("timer parsing failed for DST : " + DST);
            }
        }
    }
    return false;
}

export const mqttTimerLdbHandler: mqttOnMessageCallback_t = async (topic, payload, _log) => {
    const log = (s: string) => { _log && _log("[[ mqttTimerLdbHandler ]] " + s); }
    log("");
    var topicArray = topic.split("/");
    if (topicArray.length >= 3) {
        var msgObj = JSON.parse(payload);
        var Mac = topicArray[1];
        if (msgObj?.CMD) {
            if (msgObj.CMD == MQTT_UPSTREAM_LDB_TS_SYNC_PAYLOAD) {
                await process_mqttUpstreamLdbPayload(Mac, msgObj, log)
            }
        } else {
            log("no command found in payload -- " + payload)
        }
    } else {
        log("incorrect topic")
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
                        CMD: MQTT_DOWNSTREAM_TIMER_REQUEST_PAYLOAD,
                        TS: ldb.TS,
                        DST: ldb.DST,
                        DBS: ldb.DBS,
                    })
                );
            } else if ((ldb.TS && timerFromQuery.ldb.TS && ldb.TS < timerFromQuery.ldb.TS)) {
                log("device timestamp outdated, publishing timer payload to device");
                publish("HUE/" + Mac + "/dn", JSON.stringify({
                    CMD: MQTT_DOWNSTREAM_TIMER_PAYLOAD,
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
    const log = (s: string) => { _log && _log("[[ process_mqttLdbUpstreamTsSyncPayload ]] " + s); }
    if (verify_mqttUpstreamTimerPayload(timer)) {
        log("received timer DST " + timer.DST + " saving to DB")
        //TODO copy code from LTO section
        //TODO compare timer if found
        //TODO send timer to device if device ts outdated
        //TODO if server ts outdated, update timer mutation
    }
    return true;
}

const verify_mqttUpstreamTimerPayload: (timer: mqttUpstreamTimerPayload_i) => boolean = (timer) => {
    if (timer?.HR && timer?.MIN && timer?.DT && timer?.ET && timer?.DAYS && timer?.TS && timer?.DST /* && timer?.DBS */)
        return true;
    return false;
}

interface mqttUpstreamTimerPayload_i {
    HR?: number,
    MIN?: number,
    DT?: number,
    ET?: number,
    DAYS?: number,
    TS?: number,
    DBS?: number,
    DST?: number
}
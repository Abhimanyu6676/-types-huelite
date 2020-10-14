import { json } from "express";
import { logFun_t } from "../..";
import { HUE_DEVICE_TIMER_t } from "../../lists/HUETimer";
import { HUE_DEVICE_LDB_t } from "../../lists/HUE_ldb";

const { keystone } = require("../../index")

/**
 * find specific hueTimer with LDB.DST and MAC
 *
 * @param Mac Mac Address for the respective Device
 *
 * @param DST DB Specifier Type
 *
 * @returns Array of Matching Timers timer: { ldb:{ TS, DST, DBS }}
 *
 */
const findHueTimerWithMACnLDB_DST: () => string = () => {
    return `
query( $Mac:String!, $DST:Int!){
    allHueTimers( first :1, where : { AND : [
      {device: {Mac:$Mac}}, 
      {ldb: {DST : $DST} }
    ]}){
        id
        HR
        MIN
        DT
        ET
        DAYS
        ldb{
          id
          TS
          DST
          DBS
        }
    }
  }`;
}



type findTimerWithMacAndDst_t = (obj: { Mac: string, DST: number }, _log?: logFun_t) => Promise<findTimerWithMacAndDst_rt | undefined>

export const findTimerWithMacAndDst: findTimerWithMacAndDst_t = async ({ Mac, DST }, _log) => {
    const log = (s: string) => { _log && _log(" *find timer with MAC & DST* " + s) }
    log(Mac + "  -- " + DST)
    const timer = await keystone
        .executeQuery(findHueTimerWithMACnLDB_DST(), {
            variables: {
                Mac,
                DST,
            },
        }).then(({ data: { allHueTimers }, errors }: any) => {
            //TODO verify data
            if (allHueTimers?.length) {
                log("timer found -- " + JSON.stringify(allHueTimers))
                return allHueTimers[0];
            } else {
                log("no timer found in query ---" + JSON.stringify(errors))
                return undefined;
            }
        }).catch((err: any) => {
            log("Timer filter query failed -- " + JSON.stringify(err));
            return undefined;
        })

    return timer;
}


export type findTimerWithMacAndDst_rt = {
    id: string,
    HR: number,
    MIN: number,
    DT: number,
    ET: number,
    DAYS: number,
    ldb: HUE_DEVICE_LDB_t
    //TODO add LDB to data type timers
}
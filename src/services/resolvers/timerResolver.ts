import { HUE_TIMERS } from "../../index";
import { HUE_DEVICE_TIMER_t } from "../../lists/HUETimer";
import { findProductWithMac } from "../dbHelper/productDbHelper";
import { createTimerAndLdbWithDeviceId, findTimerWithMacAndDst, query_findHueTimerWithMACAndDst, updateTimerAndLdbWithId } from "../dbHelper/timerDbHelper"

const {
    Integer,
    Checkbox,
    Select,
    Relationship,
} = require("@keystonejs/fields");

export const timerUpdateResolver = async (root: any, args: { Mac: string, HR: number, MIN: number, DAYS: number, DT: number, ET: number, TS: number, DST: number, DBS: number }, context: any, _: any, { query }: any) => {
    //:: query timer
    /* const { data: { allHueTimers }, errors } = await query(
        query_findHueTimerWithMACAndDst(),
        {
            variables: {
                Mac: args.Mac,
                DST: args.DST
            }
        }
    ); */
    const timerFromQuery = await findTimerWithMacAndDst({ Mac: args.Mac, DST: args.DST })
    console.log("\n\n-------------------------------------------------------------------");
    console.log(JSON.stringify(args));
    console.log("\n\n-------------------------------------------------------------------");
    console.log("---------------------- " + JSON.stringify(timerFromQuery));
    if (timerFromQuery) {
        //TODO modify timer and timerLdb
        const updatedTimerNLdb = await updateTimerAndLdbWithId({
            timerId: timerFromQuery.id,
            HR: args.HR,
            MIN: args.MIN,
            DAYS: args.DAYS,
            DT: args.DT,
            ET: args.ET,
            LdbId: timerFromQuery.ldb.id,
            TS: args.TS,
            DBS: args.DBS
        })
        if (updatedTimerNLdb) {
            return {
                updatedTimer: updatedTimerNLdb,
                success: true
            }
        }
    }
    return {
        updatedTimer: {},
        success: false,
    };
}

export const type_timerLdbObj = "type type_timerLdbObj { id:ID!, TS: Int!, DST: Int!, DBS: Int! }"

export const type_TimerObj =
    " type type_TimerObj { id:ID!, HR: Int!, MIN:Int!, DAYS: Int!, DT: Int!, ET: Int!, ldb:type_timerLdbObj! }"


export const timerUpdateResolverInput =
    "input timerUpdateResolverInput {Mac: String!, HR: Int!, MIN:Int!, DAYS: Int!, DT: Int!, ET: Int!, TS: Int!, DST: Int!, DBS: Int!}";


export const timerUpdateResolverOutput =
    "type timerUpdateResolverOutput {  updatedTimer:type_TimerObj!, success: Boolean!, }";


type createTimerWithMacResolver_t = (root: any, args: { Mac: string, HR: number, MIN: number, DAYS: number, DT: number, ET: number, TS: number, DST: number, DBS: number }, context: any, _: any, { query }: any) => Promise<{ createTimer: HUE_DEVICE_TIMER_t | undefined, success: boolean }>
export const createTimerWithMacResolver: createTimerWithMacResolver_t = async (root, { Mac, HR, MIN, DAYS, DT, ET, TS, DST, DBS }, context: any, _: any, { query }: any) => {
    const log = (s: string) => { console.log("[[ createTimerResolver ]] " + s) }
    const product = await findProductWithMac(Mac, log);
    var _success = false
    var _timer = undefined
    if (product?.id) {
        log("product found proceeding to creating new timer for device -- " + JSON.stringify(product))
        //TODO create new timer
        const newTimer = await createTimerAndLdbWithDeviceId({ deviceId: product.id, HR, MIN, DAYS, DT, ET, TS, DST, DBS }, log)
        if (newTimer) {
            _timer = newTimer
            _success = true
            log("New timer created successfully -- " + JSON.stringify(newTimer))
        }
    } else {
        log("product cannot be found, skipping product creation")
    }
    return {
        createTimer: _timer,
        success: _success,
    };
}

export const createTimerResolverInput =
    "input createTimerResolverInput {Mac: String!, HR: Int!, MIN:Int!, DAYS: Int!, DT: Int!, ET: Int!, TS: Int!, DST: Int!, DBS: Int!}";


export const createTimerResolverOutput =
    "type createTimerResolverOutput {  createTimer:type_TimerObj, success: Boolean!, }";
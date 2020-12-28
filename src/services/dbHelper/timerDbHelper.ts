import { types } from "../../../@types/huelite";
import { logFun_t } from "../../index";
import { keystone } from "../../index"

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
export const query_findHueTimerWithMACAndDst: () => string = () => {
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

/**
 * find specific hueTimer with LDB.DST and MAC
 *
 * @param Mac Mac Address for the respective Device
 * @param DST DB Specifier Type
 * @returns Array of Matching Timers timer: { ldb:{ TS, DST, DBS }}
 *
 */
type findTimerWithMacAndDst_t = (obj: { Mac: string, DST: number }, _log?: logFun_t) => Promise<types.HUE_Timer_t | undefined>

export const findTimerWithMacAndDst: findTimerWithMacAndDst_t = async ({ Mac, DST }, _log) => {
    const log = (s: string) => { _log && _log(" *find timer with MAC & DST* " + s) }
    log(Mac + "  -- " + DST)
    const timer = await keystone
        .executeQuery(query_findHueTimerWithMACAndDst(), {
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



/**
 * @param id timer ID
 * @param HR hours 1 - 12 @optional
 * @param MIN minute 0 - 59 @optional
 * @param DAYS integer representing bits @optional
 * @param DT daytime 1-AM  --  2-PM @optional
 * @param ET event type 1-ON  --  2-OFF @optional
 * 
 */
const mutation_updateTimerWithId = () => {
    return `
mutation(
  $id:ID!,
  $HR:Int,
  $MIN:Int,
  $DT:Int,
  $ET:Int,
  $DAYS:Int,
) {
   updateHueTimer( id:$id, data:{
    HR:$HR,
    MIN:$MIN,
    DT:$DT,
    ET:$ET,
    DAYS:$DAYS,
  }){
    id
    HR
		MIN
    DAYS
    DT
    ET
  }
}`;
}

/**
 * @param id timer ID
 * @param HR hours 1 - 12 @optional
 * @param MIN minute 0 - 59 @optional
 * @param DAYS integer representing bits @optional
 * @param DT daytime 1-AM  --  2-PM @optional
 * @param ET event type 1-ON  --  2-OFF @optional
 * 
 */
type updateTimerWithId_t = (obj: { id: string, HR?: number, MIN?: number, DAYS?: number, DT?: number, ET?: number }, _log?: logFun_t) => Promise<types.HUE_TIMER_t | undefined>
export const updateTimerWithId: updateTimerWithId_t = async ({ id, HR, MIN, DAYS, DT, ET }, _log) => {
    const log = (s: string) => { _log && _log(" *update timer with id* " + s) }
    const updatedTimer = await keystone.executeQuery(mutation_updateTimerWithId(), {
        variables: {
            id,
            HR,
            MIN,
            DAYS,
            DT,
            ET
        }
    }).then(({ data: { updateHueTimer }, errors }: any) => {
        if (updateHueTimer) {
            log("timer updated successfully -- " + JSON.stringify(updateHueTimer));
            return updateHueTimer;
        } else {
            log("timer update failed -- " + JSON.stringify(errors));
            return undefined;
        }
    }).catch((err: any) => {
        log("timer update query failed")
        return undefined;
    })
    return updatedTimer;
}



/**
 * @param id LDB ID
 *
 * @param TS new timestamp
 * @param DBS LDB_DATA_SYNC_STATUS
 * 
 * 
 */
const query_updateTimerldbwithId = () => {
    return `
    mutation(
        $id:ID!,
        $TS:Int,
        $DBS:Int,
      ) {
         updateHueLdb( id:$id, data:{
          TS:$TS,
          DBS:$DBS,
        }){
            id
            TS
            DST
            DBS
        }
      }`;
}

type updateTimerLdbWithId_t = (obj: { id: string, TS: number, DBS: number }, _log?: logFun_t) => Promise<types.HUE_LDB_t | undefined>
export const updateTimerLdbWithId: updateTimerLdbWithId_t = async ({ id, TS, DBS }, _log) => {
    const log = (s: string) => { _log && _log(" *update timer LDB with id* " + s) }
    const updatedTimerLdb = await keystone.executeQuery(query_updateTimerldbwithId(), {
        variables: {
            id,
            TS,
            DBS
        }
    }).then(({ data: { updateHueLdb }, errors }: any) => {
        if (updateHueLdb) {
            log("timerLDB updated successfully -- " + JSON.stringify(updateHueLdb));
            return updateHueLdb;
        } else {
            log("timerLDB update failed -- " + JSON.stringify(errors));
            return undefined;
        }
    }).catch((err: any) => {
        log("timerLDB update query failed")
        return undefined;
    })
    return updatedTimerLdb;
}



type updateTimerAndLdbWithId_t = (obj: { timerId: string, HR: number, MIN: number, DAYS: number, DT: number, ET: number, LdbId: string, TS: number, DBS: number }, _log?: logFun_t) => Promise<types.HUE_TIMER_t | undefined>
export const updateTimerAndLdbWithId: updateTimerAndLdbWithId_t = async ({ timerId, HR, MIN, DAYS, DT, ET, LdbId, TS, DBS }, _log) => {
    const log = (s: string) => { _log && _log(" *update timer AND LDB with id* " + s) }
    const updatedTimer = await updateTimerWithId({ id: timerId, HR, MIN, DAYS, DT, ET }, log);
    log(" Timer update response >> " + JSON.stringify(updatedTimer))
    if (updatedTimer) {
        const updatedTimerLdb = await updateTimerLdbWithId({ id: LdbId, TS, DBS }, log);
        log(" LDB update response >> " + JSON.stringify(updatedTimerLdb))
        if (updatedTimerLdb) {
            return {
                ...updatedTimer,
                ldb: {
                    id: "",/* //BUG */
                    ...updatedTimerLdb
                }
            };
        }
    }
    return undefined;
}


/**
 * 
 * @param obj.deviceId device ID to be connected
 * @param obj.HR hours 1 - 12
 * @param obj.MIN minute 0 - 59 
 * @param obj.DAYS integer representing bits
 * @param obj.DT daytime 1-AM  --  2-PM 
 * @param obj.ET event type 1-ON  --  2-OFF 
 * @param obj.TS timestamp
 * @param obj.DST DBSpecifier as Int
 * @param obj.DBS LDB_DATA_SYNC_STATUS_t
 * @param _log @optional
 */
const mutation_createTimerAndLdbWithDeviceId = () => {
    return `
    mutation(
        $deviceId:ID!,
        $HR:Int!,
        $MIN:Int!,
        $DT:Int!,
        $ET:Int!,
        $DAYS:Int!,
        $TS:Int!,
        $DBS:Int!,
        $DST:Int!
      ) {
         createHueTimer(data:{
          device:{connect:{id:$deviceId}},
          HR:$HR,
          MIN:$MIN,
          DT:$DT,
          ET:$ET,
          DAYS:$DAYS,
          ldb:{
           create:{
            TS:$TS,
            DBS:$DBS,
            DST:$DST
            }
          }
        }){
          id
          HR
          MIN
          DAYS
          DT
          ET
          ldb{
            id
            TS
            DST
            DBS
          }
        }
      }`;
}

type createTimerAndLdbWithDeviceId_t = (obj: { deviceId: string, HR: number, MIN: number, DAYS: number, DT: number, ET: number, TS: number, DST: number, DBS: number }, _log?: logFun_t) => Promise<types.HUE_TIMER_t | undefined>
/**
 * 
 * @param obj.deviceId device ID to be connected
 * @param obj.HR hours 1 - 12
 * @param obj.MIN minute 0 - 59 
 * @param obj.DAYS integer representing bits
 * @param obj.DT daytime 1-AM  --  2-PM 
 * @param obj.ET event type 1-ON  --  2-OFF 
 * @param obj.TS timestamp
 * @param obj.DST DBSpecifier as Int
 * @param obj.DBS LDB_DATA_SYNC_STATUS_t
 * @param _log @optional
 */
export const createTimerAndLdbWithDeviceId: createTimerAndLdbWithDeviceId_t = async ({ deviceId, HR, MIN, DAYS, DT, ET, TS, DST, DBS }, _log) => {
    const log = (s: string) => { _log && _log(" *create timer AND LDB with deviceId* " + s) }
    log("\n\n" + JSON.stringify({ deviceId, HR, MIN, DAYS, DT, ET, TS, DST, DBS }))
    const newTimer = await keystone.executeQuery(mutation_createTimerAndLdbWithDeviceId(), {
        variables: {
            deviceId,
            HR,
            MIN,
            DAYS,
            DT,
            ET,
            TS,
            DST,
            DBS,
        }
    }).then(({ data: { createHueTimer } }: any) => {
        if (createHueTimer?.id) {
            log("new timer created successfully -- " + JSON.stringify(createHueTimer))
            return createHueTimer
        } else {
            log("new timer could not be crceated -- ")
        }
    }).catch((errors: any) => {
        log("Create timer query failed -- " + JSON.stringify(errors))
        return undefined
    })
    //LTO:  return newly created timer
    return newTimer
}
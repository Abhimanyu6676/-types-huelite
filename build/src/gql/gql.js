"use strict";
/**
 * filter HUE_PRODUCT with MAC Address
 */
var findProductWithMac = "\n  query($Mac: String) {\n    allHueProducts(first :1, where: { Mac: $Mac }) {\n      id\n      HostName\n      IP\n      lastState\n      Mac\n    }\n  }\n";
var gql_addProduct = "\nmutation($Mac: String!) {\n  createHueProduct(data: { Mac: $Mac }) {\n    id\n  }\n}";
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
var findHueTimerWithMACnLDB_DST = "\nquery($DST:Int, $Mac:String){\n  allHueTimers( first :1, where : { AND : [{device: {Mac:$Mac}}, \n    {ldb: {DST : $DST} }]}){\n      id\n      HR\n      MIN\n      DT\n      ET\n      DAYS\n      ldb{\n        id\n        TS\n        DST\n        DBS\n      }\n  }\n}";
var createNewTimerForDeviceByMac = "\nmutation(\n  $id:ID!,\n  $HR:Int!,\n  $MIN:Int!,\n  $DT:Int!,\n  $ET:Int!,\n  $DAYS:Int!,\n  $TS:Int!,\n  $DBS:Int!,\n  $DST:Int!\n) {\n   createHueTimer(data:{\n    device:{connect:{id:$id}},\n    HR:$HR,\n    MIN:$MIN,\n    DT:$DT,\n    ET:$ET,\n    DAYS:$DAYS,\n    ldb:{\n     create:{\n      TS:$TS,\n      DBS:$DBS,\n      DST:$DST\n      }\n    }\n  }){\n    id\n    HR\n    MIN\n    DAYS\n    DT\n    ET\n    ldb{\n      id\n      TS\n      DST\n      DBS\n    }\n  }\n}";
/**
 * @param id timer ID
 *
 * @optional
 *    - HR
 *    - MIN
 *    - DAYS
 *    - DT
 *    - ET
 */
var updateTimerwithId = "\nmutation(\n  $id:ID!,\n  $HR:Int,\n  $MIN:Int,\n  $DT:Int,\n  $ET:Int,\n  $DAYS:Int,\n) {\n   updateHueTimer( id:$id, data:{\n    HR:$HR,\n    MIN:$MIN,\n    DT:$DT,\n    ET:$ET,\n    DAYS:$DAYS,\n  }){\n    id\n    HR\n\t\tMIN\n    DAYS\n    DT\n    ET\n  }\n}";
/**
 * @param id LDB ID
 *
 * @param TS new timestamp
 *
 * @param DST DBSpecifier_t
 *
 * @param DBS LDB_DATA_SYNC_STATUS
 */
var updatetimerldbwithID = "\nmutation(\n  $id:ID!,\n  $TS:Int!,\n  $DST:Int!,\n  $DBS:Int!,\n) {\n   updateHueLdb( id:$id, data:{\n    TS:$TS,\n    DST:$DST,\n    DBS:$DBS,\n  }){\n    id\n\t  TS\n    DST\n    DBS\n  }\n}";
module.exports = {
    updatetimerldbwithID: updatetimerldbwithID,
    updateTimerwithId: updateTimerwithId,
    createNewTimerForDeviceByMac: createNewTimerForDeviceByMac,
    findHueTimerWithMACnLDB_DST: findHueTimerWithMACnLDB_DST,
    gql_addProduct: gql_addProduct,
    findProductWithMac: findProductWithMac
};

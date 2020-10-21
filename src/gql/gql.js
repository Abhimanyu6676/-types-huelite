


const gql_addProduct = `
mutation($Mac: String!) {
  createHueProduct(data: { Mac: $Mac }) {
    id
  }
}`;

/**
 * find specific hueTimer with LDB.DST and MAC
 *
 * @param Mac Mac Address for the respective Device
 *
 * @param DST DB Specifier Type
 *
 * @returns Array of Matching Timers timer: { ldb:{ TS, DST, DBS }}
 * 
 * @deprecated
 *
 */
const findHueTimerWithMACnLDB_DST = `
query($DST:Int, $Mac:String){
  allHueTimers( first :1, where : { AND : [{device: {Mac:$Mac}}, 
    {ldb: {DST : $DST} }]}){
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

const createNewTimerForDeviceByMac = `
mutation(
  $id:ID!,
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
    device:{connect:{id:$id}},
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
const updateTimerwithId = `
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

/**
 * @param id LDB ID
 *
 * @param TS new timestamp
 *
 * @param DST DBSpecifier_t
 *
 * @param DBS LDB_DATA_SYNC_STATUS
 * 
 * @deprecated
 */
const updatetimerldbwithID = `
mutation(
  $id:ID!,
  $TS:Int!,
  $DST:Int!,
  $DBS:Int!,
) {
   updateHueLdb( id:$id, data:{
    TS:$TS,
    DST:$DST,
    DBS:$DBS,
  }){
    id
	  TS
    DST
    DBS
  }
}`;



module.exports = {
  updatetimerldbwithID,
  updateTimerwithId,
  createNewTimerForDeviceByMac,
  findHueTimerWithMACnLDB_DST,
  gql_addProduct,
}
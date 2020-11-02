import { HUE_USER_t } from "../../../@types/huelite";
import { logFun_t } from "../../index";
import { keystone } from "../../index"

/**
 * find specific hueTimer with LDB.DST and MAC
 *
 * @param Email emailID of user
 * 
 * @returns query
 *
 */
export const query_findUserWithEmail: () => string = () => {
  return `
    query(
        $email:String
      ){
        allUsers(where:{email:$email}, first:1){
          id
          userName
          fbId
          googleId
          devices{
            id
            deviceName
            Mac
            groupName
            lastState
            IP
            timers{
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
          }
        }
      }`;
}



type findUserWithEmail_t = (obj: { email: string }, _log?: logFun_t) => Promise<HUE_USER_t | undefined>
/**
 * find specific hueTimer with LDB.DST and MAC
 *
 * @param email emailID of user
 * 
 * @returns Array of User: { userName, email, fbId, googleId}
 *
 */
export const DB_getUser_email: findUserWithEmail_t = async ({ email }, _log) => {
  const log = (s: string) => { _log && _log("<findUserWithEmail> " + s) }
  const user = await keystone
    .executeQuery(query_findUserWithEmail(), {
      variables: {
        email
      },
    }).then(({ data: { allUsers }, errors }: any) => {
      //TODO verify data
      log("user found -- " + JSON.stringify(allUsers))
      if (allUsers?.length) {
        return allUsers[0];
      } else {
        log("no user found with email: " + email + " ---" + JSON.stringify(errors))
        return undefined;
      }
    }).catch((err: any) => {
      log("User search with email failed -- " + JSON.stringify(err));
      return undefined;
    })

  return user;
}
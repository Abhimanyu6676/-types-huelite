const ldb_fields = `id
TS
DST
DBS`

const timer_fields = `id
HR
MIN
DAYS
DT
ET
ldb{
  ${ldb_fields}
}`

const device_fields = `id
deviceName
Mac
groupName
lastState
IP
timers{
  ${timer_fields}
}`

const user_fields = ` id
userName
email
fbId
googleId
devices{
  ${device_fields}
}`


export const gql_getUserWithFbId = (`query(
    $fbId:String!
  ){
    allUsers(where:{fbId:$fbId}, first:1){
      ${user_fields}
    }
  }`)


export const gql_createUser = (`mutation(
    $userName:String,
    $email:String!,
    $fbId:String,
    $googleId:String,
    $password:String
  ){
    createUser(data:{
      userName:$userName,
      email:$email,
      fbId:$fbId,
      googleId:$googleId,
      password:$password
    }){
      id
      userName
      email
      fbId
      googleId
    }
  }`)


export const query_findUserWithEmail = (`query(
  $email:String!
){
  allUsers(where:{email:$email}, first:1){
    ${user_fields}
  }
}`)


/**
 * 
 * 
 * //TODO this class works on keystone queries, for better performance this is to be ported to mongoose adapter usage for DB transactions
 */


import { keystone } from "../../index";
import { logFun_t } from "../../index";
import { HUE_DEVICE_PRODUCT_t } from "../../lists/HUEProduct";


/**
 * 
 * 
 * @param Mac! - `required` mac Address of new Device
 * @param $Hostname optional
 * @param $IP optional
 * @param $groupName optional
 * @param $deviceName optional
 * @param $lastState optional
 * 
 * @returns newly created Product {id, Mac, Hostname, deviceName, groupName, IP, lastState}
 */
const gql_addProduct: () => string = () => {
    return `
    mutation(
    $Mac: String!
    $Hostname:String
    $lastState:String
    $groupName :String
    $IP:String
    $deviceName:String
  ) {
      createHueProduct(data: { 
        Mac: $Mac, 
        HostName:$Hostname, 
        groupName:$groupName, 
        lastState:$lastState,
        IP:$IP,
        deviceName:$deviceName
      }) {
        id
        Mac
        HostName
        groupName
        deviceName
        IP
        lastState
      }
    }`;
}


/**
 * 
 * 
 * @param Mac! - `required` mac Address of new Device
 * @param $Hostname optional
 * @param $IP optional
 * @param $groupName optional
 * @param $deviceName optional
 * @param $lastState optional
 * 
 * @returns newly created Product {id, Mac, Hostname, deviceName, groupName, IP, lastState}
 */
//@ts-ignore
const _addNewProduct = ({ Mac, Hostname, IP, groupName, deviceName, lastState }) => {
    return new Promise(async (resolve, reject) => {
        await keystone.executeQuery(gql_addProduct(), {
            variables: {
                Mac,
                IP,
                Hostname,
                groupName,
                deviceName,
                lastState,
            }
            //@ts-ignore
        }).then(({ data: { createHueProduct }, errors }) => {
            if (!errors) {
                console.log("product creation data -- " + JSON.stringify(createHueProduct));
                resolve(createHueProduct);
            } else {
                console.log("mutation could not be completed -- " + JSON.stringify(errors));
                reject();
            }
            //@ts-ignore
        }).catch((error) => {
            console.log("product creation query failed -- " + JSON.stringify(error));
            reject();
        });
    });
}

interface addNewProduct_i {
    Mac: String,
    Hostname?: String,
    IP?: String,
    groupName?: String,
    deviceName?: String,
    lastState?: String,
}
type addNewProduct_t = (obj: addNewProduct_i, log?: (s: string) => void) => void
export const addNewProduct: addNewProduct_t = async ({ Mac, Hostname, IP, groupName, deviceName, lastState, }, log) => {
    const k = await keystone.executeQuery(gql_addProduct(), {
        variables: {
            Mac,
            IP,
            Hostname,
            groupName,
            deviceName,
            lastState,
        }
        //@ts-ignore
    }).then(({ data: { createHueProduct }, errors }) => {
        if (!errors) {
            log && log("product creation successfull -- " + JSON.stringify(createHueProduct));
            return createHueProduct;
        } else {
            log && log("create new product " + Mac + " mutation could not be completed -- " + JSON.stringify(errors));
            return undefined;
        }
        //@ts-ignore
    }).catch((error) => {
        log && log("product creation query failed -- " + JSON.stringify(error));
        return undefined;
    });
    return k;

}


/**
 * filter HUE_PRODUCT with MAC Address
 * 
 * @param Mac MAC address of the devvice to find
 */
const gql_findProductWithMac: () => string = () => {
    return `
query($Mac:String!){
    allHueProducts(first:1, where:{Mac:$Mac}){
      id
      Mac
      IP
      HostName
      deviceName
      groupName
      lastState
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
`;
}

type findProductWithMac_t = (Mac: string, _log?: logFun_t) => Promise<HUE_DEVICE_PRODUCT_t | undefined>

export const findProductWithMac: findProductWithMac_t = async (Mac, _log) => {
    const log = (s: string) => { _log && _log(" *find product with mac*" + s) }
    ///find product
    const product = await keystone
        .executeQuery(gql_findProductWithMac(), {
            variables: { Mac },
        }).then(({ data: { allHueProducts }, errors }: any) => {
            if (allHueProducts?.length) {
                log(" product filter query response data -- " + JSON.stringify(allHueProducts));
                return allHueProducts[0];
            }
            else {
                log(" product filter query -- no product found");
                return undefined;
            }
        }).catch((error: any) => {
            //TODO log query failed
            log(" product search query failed -- " + JSON.stringify(error));
            return undefined;
        })

    return product;
}





import { timestamp_i } from "../base.types"
import { HUE_TIMER_t } from "../timer/types"
import { HUE_User_t } from "../user/types"




/** @description >- Client side Local representation of device Object */
export interface HUE_DEVICE_t extends Omit<Omit<Omit<HUE_Device_t, "id">, "hsv">, "IP">, timestamp_i {
    socket?: any,
    id?: string,
    IP: string,
    hsv?: [number, number, number]/** whole numbers [360, 100, 100] */
}
/** @description >- backend representation of device Object */
export interface HUE_Device_t extends timestamp_i {
    id: string,
    Mac: string,
    IP?: string,
    deviceName?: string,
    ssid?: string,
    hsv?: string,
    groupName?: string,
    lastState?: string,
    timers?: HUE_TIMER_t[]
    user?: HUE_User_t
    //add timers to data type timers
}
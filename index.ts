import { HUE_DEVICES_store_t } from "../../redux/reducers/DeviceListReducer";

export enum HUE_DEVICE_CONTAINER_TYPE_e {
    SINGLETON = 1,
    MULTIPLE = 0,
}

export enum HUE_GROUP_CATEGORIES_e {
    STRIP_OW = 0,
    STRIP_CW = 1,
    STRIP_RGB = 2,
    STRIP_RGBW = 3,
    STRIP_NEO = 4,
}


export type HUE_USER_t = {
    id: string | undefined,
    userName?: string,
    email: string,
    fbId?: string,
    googleId?: string
    devices?: HUE_DEVICE_t[]
}

export type HUE_CONTAINER_t = {
    groupName: string;
    groupUUID: string;
    groupAdmin: string;
    activeMode: string;
    conType: HUE_DEVICE_CONTAINER_TYPE_e;
    conCategory: HUE_GROUP_CATEGORIES_e;
    timers: (HUE_TIMER_group_t | undefined)[];
    devices: HUE_DEVICES_store_t[];
};

export type HUE_DEVICE_t = {
    id: string | undefined,
    Mac: string,
    IP?: string,
    deviceName?: string,
    groupName?: string,
    lastState?: string,
    timers?: HUE_TIMER_t[]
    user?: HUE_USER_t
    //add timers to data type timers
}

export type HUE_TIMER_group_t = HUE_TIMER_t & { devices: string[] }

export type HUE_TIMER_t = {
    id: string | undefined,
    device?: HUE_DEVICE_t,
    HR?: number,
    MIN?: number,
    DT?: number,
    ET?: number,
    DAYS?: number,
    ldb: HUE_LDB_t
    //TODO add LDB to data type timers
}

export type HUE_LDB_t = {
    id: string | undefined,
    TS: number,
    DST: number,
    DBS: number,
}


export interface err_i { errCode: "UNKNOWN_ERR" | "NO_USER" | "USER_CREATION_FAILED" | "DUPLICATE_EMAIL" | "PASSWORD_MIN_LENGTH", errMsg: string, error: any }

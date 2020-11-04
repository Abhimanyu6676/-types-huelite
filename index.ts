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

/** @description >- Client side Local representation of user Object */
export type HUE_USER_t = {
    id?: string,
    userName?: string,
    email: string,
    fbId?: string,
    googleId?: string
    containers?: HUE_CONTAINER_t[]
}

/** @description >- backend representation of user Object */
export type HUE_User_t = {
    id: string,
    userName?: string,
    email: string,
    fbId?: string,
    googleId?: string
    containers: HUE_Container_t[]
}

/** @description >- Client side Local representation of container Object */
export type HUE_CONTAINER_t = {
    id?: string,
    groupName: string;
    groupUUID: string;
    groupAdmin: string;
    activeMode: string;
    conType: HUE_DEVICE_CONTAINER_TYPE_e;
    conCategory: HUE_GROUP_CATEGORIES_e;
    timers?: HUE_TIMER_group_t[];
    devices: HUE_DEVICE_t[];
};

/** @description >- backend representation of conatiner Object */
export type HUE_Container_t = {
    id: string,
    groupName: string;
    groupUUID: string;
    groupAdmin: string;
    activeMode: string;
    conType: HUE_DEVICE_CONTAINER_TYPE_e;
    conCategory: HUE_GROUP_CATEGORIES_e;
    timers?: HUE_TIMER_group_t[];
    devices: HUE_Device_t[];
    user?: HUE_User_t
};

/** @description >- Client side Local representation of device Object */
export type HUE_DEVICE_t = (HUE_Device_t & {
    socket: any,
    id?: string,
    hsv: [number, number, number]/** whole numbers [360, 100, 100] */
})


/** @description >- backend representation of device Object */
export type HUE_Device_t = {
    id: string,
    Mac: string,
    IP?: string,
    deviceName?: string,
    hsv: string,
    groupName?: string,
    lastState?: string,
    timers?: HUE_TIMER_t[]
    user?: HUE_USER_t
    //add timers to data type timers
}

export type HUE_TIMER_group_t = HUE_TIMER_t & { devices: string[] }

/** @description >- Client side Local representation of timer Object */
export type HUE_TIMER_t = {
    id?: string,
    HR?: number,
    MIN?: number,
    DT?: number,
    ET?: number,
    DAYS?: number,
    ldb: HUE_LDB_t
}

/** @description >- backend representation of timer Object */
export type HUE_Timer_t = {
    id: string,
    device?: HUE_Device_t,
    HR?: number,
    MIN?: number,
    DT?: number,
    ET?: number,
    DAYS?: number,
    ldb: HUE_Ldb_t
    //TODO add LDB to data type timers
}

/** @description >- Client side Local representation of LDB Object */
export type HUE_LDB_t = {
    id?: string,
    TS: number,
    DST: number,
    DBS: number,
}

/** @description >- backend representation of LDB Object */
export type HUE_Ldb_t = {
    id: string,
    TS: number,
    DST: number,
    DBS: number,
}


export interface err_i { errCode: "UNKNOWN_ERR" | "NO_USER" | "USER_CREATION_FAILED" | "DUPLICATE_EMAIL" | "PASSWORD_MIN_LENGTH", errMsg: string, error: any }

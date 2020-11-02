export type HUE_USER_t = {
    id: string,
    userName?: string,
    email: string,
    fbId?: string,
    googleId?: string
    devices?: HUE_DEVICE_t[]
}

export type HUE_DEVICE_t = {
    id: string,
    Mac: string,
    IP?: string,
    deviceName?: string,
    groupName?: string,
    lastState?: string,
    timers?: HUE_TIMER_t[]
    user?: HUE_USER_t
    //add timers to data type timers
}

export type HUE_TIMER_t = {
    id: string,
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
    id: string,
    TS: number,
    DST: number,
    DBS: number,
}


export interface err_i { errCode: "UNKNOWN_ERR" | "NO_USER" | "USER_CREATION_FAILED" | "DUPLICATE_EMAIL" | "PASSWORD_MIN_LENGTH", errMsg: string, error: any }

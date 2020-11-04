import { HUE_User_t } from "../index";

export interface API_USER_SIGNIN_rs_t {
    success: boolean
    error?: string
    data?: HUE_User_t
}
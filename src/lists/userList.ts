import { HUE_DEVICE_t } from "./HUEProduct";

const {
    Integer,
    Checkbox,
    Select,
    Relationship,
    Password,
    Text
} = require("@keystonejs/fields");

module.exports = {
    fields: {
        userName: {
            type: Text,
        },
        email: {
            //TODO set type email
            type: Text,
            isRequired: true,
        },
        fbId: {
            type: Text,
        },
        googleId: {
            type: Text,
        },
        password: { type: Password },
        devices: { type: Relationship, ref: "hue_product.user", many: true, }
    },
};


export type HUE_USER_t = {
    id: string,
    userName?: string,
    email: string,
    fbId?: string,
    googleId?: string
    devices?: HUE_DEVICE_t[]
}

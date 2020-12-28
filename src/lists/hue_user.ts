//@ts-ignore
const { Integer, Checkbox, Select, Relationship, Password, Text } = require("@keystonejs/fields");

module.exports = {
    fields: {
        userName: {
            type: Text,
        },
        email: {
            //TODO set type email
            type: Text,
            isRequired: true,
            isUnique: true,
        },
        fbId: {
            type: Text,
            isUnique: true,
        },
        googleId: {
            type: Text,
            isUnique: true,
        },
        ts: {
            type: Integer,
            isRequired: true
        },
        password: { type: Password },
        devices: { type: Relationship, ref: "hue_device.user", many: true, },
    },
};
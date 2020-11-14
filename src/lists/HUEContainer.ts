//@ts-ignore
const { Integer, Checkbox, Select, Relationship, Text } = require("@keystonejs/fields");

module.exports = {
    fields: {
        groupName: {
            type: Text,
        },
        groupUUID: {
            type: Text,
            isRequired: true,
        },
        groupAdmin: {
            type: Text,
        },
        activeMode: {
            type: Text,
        },
        conType: {
            type: Integer,
            isRequired: true
        },
        conCategory: {
            type: Integer,
            isRequired: true
        },
        timers: {
            type: Text,
            many: true
        },
        user: {
            type: Relationship,
            ref: "user.containers",
            isRequired: true
        },
        ts: {
            type: Integer,
            isRequired: true
        },
        devices: {
            type: Relationship,
            ref: "hue_product.container",
            many: true
        },
    },
};

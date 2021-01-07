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
        ts: {
            type: Integer
        },
        password: { type: Password, rejectCommon: true },
        devices: { type: Relationship, ref: "hue_device.user", many: true, isRequired: true },
    },
    labelField: "email",
    hooks: {
        //@ts-ignore Hooks for create and update operations
        resolveInput: ({ operation, existingItem, originalInput, resolvedData, context, listKey, fieldPath }) => {
            // Input resolution logic. Object returned is used in place of `resolvedData`.
            return { ...originalInput, ts: Math.floor(Date.now() / 1000) }
        }

    },
};
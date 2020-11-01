"use strict";
//@ts-ignore
var _a = require("@keystonejs/fields"), TText = _a.Text, Integer = _a.Integer, Checkbox = _a.Checkbox, Relationship = _a.Relationship;
module.exports = {
    fields: {
        deviceName: {
            type: TText,
        },
        Mac: {
            type: TText,
            isRequired: true,
            isUnique: true,
        },
        HostName: {
            type: TText,
        },
        IP: {
            type: TText,
        },
        groupName: {
            type: TText,
        },
        lastState: {
            type: TText,
        },
        timers: {
            type: Relationship,
            ref: "hue_timer.device",
            many: true,
        },
        user: {
            type: Relationship,
            ref: "user.devices"
        }
    },
    labelField: "selectionName",
};

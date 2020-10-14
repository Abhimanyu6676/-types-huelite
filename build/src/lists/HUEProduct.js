"use strict";
var _a = require("@keystonejs/fields"), Text = _a.Text, Integer = _a.Integer, Checkbox = _a.Checkbox, Relationship = _a.Relationship;
module.exports = {
    fields: {
        deviceName: {
            type: Text,
        },
        Mac: {
            type: Text,
            isRequired: true,
            isUnique: true,
        },
        HostName: {
            type: Text,
        },
        IP: {
            type: Text,
        },
        groupName: {
            type: Text,
        },
        lastState: {
            type: Text,
        },
        timers: {
            type: Relationship,
            ref: "hue_timer.device",
            many: true,
        },
    },
    labelField: "selectionName",
};

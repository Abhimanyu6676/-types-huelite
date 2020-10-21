"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require("@keystonejs/fields"), Integer = _a.Integer, Checkbox = _a.Checkbox, Select = _a.Select, Relationship = _a.Relationship;
module.exports = {
    fields: {
        device: {
            type: Relationship,
            ref: "hue_product.timers",
            isRequired: true,
        },
        HR: {
            type: Integer,
            isRequired: true,
        },
        MIN: {
            type: Integer,
            isRequired: true,
        },
        DT: {
            type: Integer,
            isRequired: true,
        },
        ET: {
            type: Integer,
            isRequired: true,
        },
        DAYS: {
            type: Integer,
            isRequired: true,
        },
        ldb: {
            type: Relationship,
            ref: "hue_ldb.db",
            isRequired: true,
        },
    },
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require("@keystonejs/fields"), Integer = _a.Integer, Checkbox = _a.Checkbox, Select = _a.Select, Relationship = _a.Relationship;
module.exports = {
    fields: {
        db: {
            type: Relationship,
            ref: "hue_timer.ldb",
            isRequired: true,
        },
        TS: {
            type: Integer,
            isRequired: true,
        },
        DST: {
            type: Integer,
            isRequired: true,
        },
        DBS: {
            type: Integer,
            isRequired: true,
        },
    },
};

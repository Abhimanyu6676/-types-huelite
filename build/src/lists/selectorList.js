"use strict";
var _a = require("@keystonejs/fields"), Text = _a.Text, Integer = _a.Integer, Checkbox = _a.Checkbox, Relationship = _a.Relationship;
module.exports = {
    fields: {
        selector: {
            type: Text,
        },
        selectorDescription: {
            type: Text,
        },
        selections: {
            type: Relationship,
            ref: "selectorDataset",
            many: true,
        },
    },
    labelField: "selector",
};

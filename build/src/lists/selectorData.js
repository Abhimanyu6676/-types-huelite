"use strict";
var _a = require("@keystonejs/fields"), Text = _a.Text, Integer = _a.Integer, Checkbox = _a.Checkbox, Relationship = _a.Relationship;
module.exports = {
    fields: {
        selectionName: {
            type: Text,
            isRequired: true,
        },
        selectionDescription: {
            type: Text,
        },
        selectionCode: {
            type: Text,
            isRequired: true,
        },
        selectionHint: {
            type: Text,
        },
    },
    labelField: "selectionName",
};

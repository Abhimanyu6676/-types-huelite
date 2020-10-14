"use strict";
var _a = require("@keystonejs/fields"), Text = _a.Text, Integer = _a.Integer, Checkbox = _a.Checkbox, Relationship = _a.Relationship;
module.exports = {
    fields: {
        email: {
            type: Text,
            isRequired: true,
        },
    },
    labelField: "email",
};

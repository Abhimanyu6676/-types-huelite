"use strict";
var _a = require("@keystonejs/fields"), Text = _a.Text, Integer = _a.Integer, Checkbox = _a.Checkbox, Relationship = _a.Relationship;
module.exports = {
    fields: {
        varientName: {
            type: Text,
            isRequired: true,
        },
        variance: {
            type: Text,
        },
        varient: {
            type: Text,
            isRequired: true,
        },
        varientFullName: {
            type: Text,
        },
        varientCode: {
            type: Text,
            isRequired: true,
        },
        varientHint: {
            type: Text,
        },
        varientDescription: {
            type: Text,
        },
        varientFeatures: {
            type: Relationship,
            ref: "featuresList",
        },
        varientSpec: {
            type: Text,
        },
        varientImg: {
            type: Text,
        },
        imgAdd: {
            type: Text,
        },
    },
    labelField: "varientFullName",
};

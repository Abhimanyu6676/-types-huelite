"use strict";
//@ts-ignore
var _a = require("@keystonejs/fields"), Integer = _a.Integer, Checkbox = _a.Checkbox, Select = _a.Select, Relationship = _a.Relationship, Password = _a.Password, Text = _a.Text;
module.exports = {
    fields: {
        userName: {
            type: Text,
        },
        email: {
            //TODO set type email
            type: Text,
            isRequired: true,
        },
        fbId: {
            type: Text,
        },
        googleId: {
            type: Text,
        },
        password: { type: Password },
        devices: { type: Relationship, ref: "hue_product.user", many: true, }
    },
};

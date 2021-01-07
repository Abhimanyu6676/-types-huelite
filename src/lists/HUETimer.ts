//@ts-ignore
const { Integer, Checkbox, Select, Relationship, } = require("@keystonejs/fields");

module.exports = {
  fields: {
    device: {
      type: Relationship,
      ref: "hue_device.timers",
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




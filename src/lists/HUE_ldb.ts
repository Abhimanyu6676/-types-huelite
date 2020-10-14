const {
  Integer,
  Checkbox,
  Select,
  Relationship,
} = require("@keystonejs/fields");

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


export type HUE_DEVICE_LDB_t = {
  id: string,
  TS?: number,
  DST?: number,
  DBS?: number,
}

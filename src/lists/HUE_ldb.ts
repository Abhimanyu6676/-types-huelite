const {
  Integer,
  Checkbox,
  Select,
  Relationship,
} = require("@keystonejs/fields");

module.exports = {
  fields: {
    db: {/* DB that is related to this ldb */
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


export type HUE_LDB_t = {
  id: string,
  TS: number,
  DST: number,
  DBS: number,
}

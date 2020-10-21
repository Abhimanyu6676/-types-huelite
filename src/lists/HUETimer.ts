import { HUE_DEVICE_PRODUCT_t } from "./HUEProduct";
import { HUE_DEVICE_LDB_t } from "./HUE_ldb";

const {
  Integer,
  Checkbox,
  Select,
  Relationship,
} = require("@keystonejs/fields");

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


export type HUE_DEVICE_TIMER_t = {
  id: string,
  device?: HUE_DEVICE_PRODUCT_t,
  HR?: number,
  MIN?: number,
  DT?: number,
  ET?: number,
  DAYS?: number,
  ldb?: HUE_DEVICE_LDB_t
  //TODO add LDB to data type timers
}




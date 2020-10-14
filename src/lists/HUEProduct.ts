import { HUE_DEVICE_TIMER_t } from "./HUETimer";

const { Text: TText, Integer, Checkbox, Relationship } = require("@keystonejs/fields");

module.exports = {
  fields: {
    deviceName: {
      type: TText,
    },
    Mac: {
      type: TText,
      isRequired: true,
      isUnique: true,
    },
    HostName: {
      type: TText,
      //isRequired: true,
    },
    IP: {
      type: TText,
      //isRequired: true,
    },
    groupName: {
      type: TText,
    },
    lastState: {
      type: TText,
    },
    timers: {
      type: Relationship,
      ref: "hue_timer.device",
      many: true,
    },
  },
  labelField: "selectionName",
};


export type HUE_DEVICE_PRODUCT_t = {
  id: string,
  Mac: string,
  IP?: string,
  Hostname?: string,
  deviceName?: string,
  groupName?: string,
  lastState?: string,
  timers?: HUE_DEVICE_TIMER_t[]
  //add timers to data type timers
}

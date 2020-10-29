import { HUE_DEVICE_TIMER_t as HUE_TIMER_t } from "./HUETimer";
import { HUE_USER_t } from "./userList";

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
    user: {
      type: Relationship,
      ref: "user.devices"
    }
  },
  labelField: "selectionName",
};


export type HUE_DEVICE_t = {
  id: string,
  Mac: string,
  IP?: string,
  deviceName?: string,
  groupName?: string,
  lastState?: string,
  timers?: HUE_TIMER_t[]
  user?: HUE_USER_t
  //add timers to data type timers
}

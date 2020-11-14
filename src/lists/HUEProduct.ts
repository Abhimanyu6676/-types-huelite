//@ts-ignore
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
    ssid: {
      type: TText,
    },
    hsv: {
      type: Integer,
      many: true,
      defaultValue: "50,100,100"//TODO match the pattern of HSV to [h/360, s/100, s/100]
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
    },
    ts: {
      type: Integer,
      isRequired: true
    },
    container: {
      type: Relationship,
      ref: "hue_container.devices"
    }
  },
  labelField: "selectionName",
};



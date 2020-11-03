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
    container:{
      type:Relationship,
      ref:"hue_container.devices"
    }
  },
  labelField: "selectionName",
};



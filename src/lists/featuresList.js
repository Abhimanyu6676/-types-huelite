const {
  Text,
  Integer,
  Checkbox,
  Select,
  Relationship,
} = require("@keystonejs/fields");

module.exports = {
  fields: {
    dimmable: {
      type: Checkbox,
    },
    tunable: {
      type: Checkbox,
    },
    spectrum: {
      type: Select,
      options: "CW, WW, NW, SP, NN, TN, NP",
    },
    scheduler: {
      type: Checkbox,
    },
    OTAControl: {
      type: Checkbox,
    },
    modes: {
      type: Checkbox,
    },
    Alexa: {
      type: Checkbox,
    },
    googleAssistant: {
      type: Checkbox,
    },
    siri: {
      type: Checkbox,
    },
    IFTT: {
      type: Checkbox,
    },
    zapier: {
      type: Checkbox,
    },
  },
};

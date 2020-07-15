const { Text, Integer, Checkbox, Relationship } = require("@keystonejs/fields");

module.exports = {
  fields: {
    varientName: {
      type: Text,
      isRequired: true,
    },
    variance: {
      type: Text,
    },
    varient: {
      type: Text,
      isRequired: true,
    },
    varientFullName: {
      type: Text,
    },
    varientCode: {
      type: Text,
      isRequired: true,
    },
    varientHint: {
      type: Text,
    },
    varientDescription: {
      type: Text,
    },
    varientFeatures: {
      type: Relationship,
      ref: "featuresList",
    },
    varientSpec: {
      type: Text,
    },
    varientImg: {
      type: Text,
    },
    imgAdd: {
      type: Text,
    },
  },
  labelField: "varientFullName",
};

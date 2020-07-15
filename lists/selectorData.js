const { Text, Integer, Checkbox, Relationship } = require("@keystonejs/fields");

module.exports = {
  fields: {
    selectionName: {
      type: Text,
      isRequired: true,
    },
    selectionDescription: {
      type: Text,
    },
    selectionCode: {
      type: Text,
      isRequired: true,
    },
    selectionHint: {
      type: Text,
    },
  },
  labelField: "selectionName",
};

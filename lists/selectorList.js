const { Text, Integer, Checkbox, Relationship } = require("@keystonejs/fields");

module.exports = {
  fields: {
    selector: {
      type: Text,
    },
    selectorDescription: {
      type: Text,
    },
    selections: {
      type: Relationship,
      ref: "selectorDataset",
      many: true,
    },
  },
  labelField: "selector",
};

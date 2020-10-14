const { Text, Integer, Checkbox, Relationship } = require("@keystonejs/fields");

module.exports = {
  fields: {
    email: {
      type: Text,
      isRequired: true,
    },
  },
  labelField: "email",
};

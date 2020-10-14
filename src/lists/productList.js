const {
  Text,
  Integer,
  Select,
  Checkbox,
  Relationship,
} = require("@keystonejs/fields");

module.exports = {
  fields: {
    productName: {
      type: Text,
      isRequired: true,
    },
    productCode: {
      type: Text,
      isRequired: true,
      isUnique: true,
    },
    productDes: {
      type: Text,
    },
    productDiscountQuote: {
      type: Text,
    },
    isTrending: {
      type: Checkbox,
    },
    category: {
      type: Select,
      options: "CRYSTAL, SPECTRUM, TUNNABLE, AURORA, PEARL",
    },
    productType: {
      type: Select,
      options: "STRIPS, BULBS, DOWNLIGHTS, TUBELIGHTS",
    },
    productKeywords: {
      type: Text,
    },
    varients: {
      type: Relationship,
      many: true,
      ref: "varient",
    },
    selectors: {
      type: Relationship,
      ref: "selector",
      many: true,
    },
    productSpec: {
      type: Text,
    },
    productStoreImg: {
      type: Text,
    },
    shouldShow: {
      type: Checkbox,
    },
    available:{
      type:Checkbox
    }
  },
  labelField: "productName",
};

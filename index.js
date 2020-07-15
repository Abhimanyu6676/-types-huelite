const { Keystone } = require("@keystonejs/keystone");
const { Text } = require("@keystonejs/fields");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { StaticApp } = require("@keystonejs/app-static");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);

const { MongooseAdapter: Adapter } = require("@keystonejs/adapter-mongoose");

//::Lists Imports
const SubscriberSchema = require("./lists/subscriberList");
const ProductSchema = require("./lists/productList");
const VarientSchema = require("./lists/varientList");
const SelectorDatasetSchema = require("./lists/selectorData");
const SelectorSchema = require("./lists/selectorList");
const FeaturesSchema = require("./lists/featuresList");

//::Custom Imports
const { Express } = require("./Express.js");

//::Server Configurations
const PROJECT_NAME = "hue_server";
const adapterConfig = { mongoUri: "mongodb://localhost:27017/huelite" };

//::Keystone Configurations
const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter(adapterConfig),
  sessionStore: new MongoStore({
    url: "mongodb://localhost:27017/hue_session",
  }),
  cookieSecret: ",hjsbd;fjnsad,mvn'aiorwjnb",
});

//::List Creations
keystone.createList("subscriber", SubscriberSchema);
keystone.createList("product", ProductSchema);
keystone.createList("varient", VarientSchema);
keystone.createList("selectorDataset", SelectorDatasetSchema);
keystone.createList("selector", SelectorSchema);
keystone.createList("featuresList", FeaturesSchema);

//::keystone Apps
module.exports = {
  keystone,
  configureExpress: (app) => {
    app.set("trust proxy", true);
  },
  apps: [
    new Express(),
    new GraphQLApp({
      apiPath: "/backend/admin/api",
      graphiqlPath: "/backend/admin/graphiql",
    }),
    new StaticApp({ path: "/", src: "../hue_web/src/serverImages" }),
    new AdminUIApp({
      adminPath: "/backend/admin",
      apiPath: "/backend/admin/api",
      graphiqlPath: "/backend/admin/graphiql",
      enableDefaultRoute: true,
    }),
  ],
};

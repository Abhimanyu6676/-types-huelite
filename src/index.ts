const { Keystone } = require("@keystonejs/keystone");
const { Text: TText } = require("@keystonejs/fields");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { StaticApp } = require("@keystonejs/app-static");
const { MongooseAdapter } = require("@keystonejs/adapter-mongoose");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);
//check

const { MongooseAdapter: Adapter } = require("@keystonejs/adapter-mongoose");

//::Lists Imports
const SubscriberSchema = require("./lists/subscriberList");
const ProductSchema = require("./lists/productList");
const VarientSchema = require("./lists/varientList");
const SelectorDatasetSchema = require("./lists/selectorData");
const SelectorSchema = require("./lists/selectorList");
const FeaturesSchema = require("./lists/featuresList");
const HUE_PRODUCT_Schema = require("./lists/HUEProduct");
const HUE_TIMER_Schema = require("./lists/HUETimer");
const HUE_LDB_Schema = require("./lists/HUE_ldb");

//::Custom Imports
import { Express } from "./Express";

//::Server Configurations
const PROJECT_NAME = "hue_server";
const adapterConfig = { mongoUri: "mongodb://localhost:27017/huelite" };

//::Keystone Configurations
//@ts-ignore
const keystone = new Keystone({
  name: PROJECT_NAME,
  //adapter: new Adapter(adapterConfig),
  adapter: new MongooseAdapter(adapterConfig),
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
export const HUE_PRODUCTS = keystone.createList("hue_product", HUE_PRODUCT_Schema);
//@ts-ignore
export const HUE_TIMERS = keystone.createList("hue_timer", HUE_TIMER_Schema);
export const HUE_LDB = keystone.createList("hue_ldb", HUE_LDB_Schema);

//::keystone Apps
module.exports = {
  keystone,
  configureExpress: (app: any) => {
    app.set("trust proxy", true);
  },
  apps: [
    new Express(),
    new GraphQLApp({
      apiPath: "/backend/admin/api",
      graphiqlPath: "/backend/admin/graphiql",
    }),
    new AdminUIApp({
      adminPath: "/backend/admin",
      apiPath: "/backend/admin/api",
      graphiqlPath: "/backend/admin/graphiql",
      enableDefaultRoute: false,
    }),
    //new StaticApp({ path: "/", src: "../hue_web/src/serverImages" }),
    //new StaticApp({ path: "/", src: "../HueliteWeb/build", fallback: 'index.html', }),
  ],
  HUE_PRODUCTS,
  HUE_TIMERS,
  HUE_LDB,
};


export type logFun_t = (s: string) => void;

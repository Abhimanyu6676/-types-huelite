const { Keystone } = require("@keystonejs/keystone");
const { Text: TText } = require("@keystonejs/fields");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { StaticApp } = require("@keystonejs/app-static");
const { MongooseAdapter } = require("@keystonejs/adapter-mongoose");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
//check

const { MongooseAdapter: Adapter } = require("@keystonejs/adapter-mongoose");

//::Lists Imports
const SubscriberSchema = require("./lists/subscriberList");
const ProductSchema = require("./lists/productList");
const VarientSchema = require("./lists/varientList");
const SelectorDatasetSchema = require("./lists/selectorData");
const SelectorSchema = require("./lists/selectorList");
const FeaturesSchema = require("./lists/featuresList");
const HUE_DEVICE_Schema = require("./lists/hue_device");
const HUE_TIMER_Schema = require("./lists/HUETimer");
const HUE_LDB_Schema = require("./lists/HUE_ldb");
const UserSchema = require("./lists/hue_user");

//::Custom Imports
import { Express } from "./expressCustom";
import { timerUpdateResolverInput, timerUpdateResolverOutput, type_TimerObj, timerUpdateResolver, type_timerLdbObj, createTimerResolverOutput, createTimerWithMacResolver } from "./services/resolvers/timerResolver";

//::Server Configurations
const PROJECT_NAME = "hue_server";
const adapterConfig = { mongoUri: "mongodb://localhost:27017/huelite" };

//::Keystone Configurations
//@ts-ignore
export const keystone = new Keystone({
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
keystone.createList("user", UserSchema);
export const HUE_PRODUCTS = keystone.createList("hue_device", HUE_DEVICE_Schema);
export const HUE_TIMERS = keystone.createList("hue_timer", HUE_TIMER_Schema);
export const HUE_LDB = keystone.createList("hue_ldb", HUE_LDB_Schema);

export const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'user',
  config: {
    identityField: 'email',
    secretField: 'password',
  },
});


keystone.extendGraphQLSchema({
  types: [
    {
      type: timerUpdateResolverOutput,
    }, {
      type: type_TimerObj,
    }, {
      type: type_timerLdbObj,
    }, {
      type: createTimerResolverOutput,
    }
  ],
  mutations: [
    {
      schema: 'updateTimer(Mac: String!, HR: Int!, MIN:Int!, DAYS: Int!, DT: Int!, ET: Int!, TS: Int!, DST: Int!, DBS: Int!): timerUpdateResolverOutput',
      resolver: timerUpdateResolver,
    }, {
      schema: 'createTimerWithDeviceMac(Mac: String!, HR: Int!, MIN:Int!, DAYS: Int!, DT: Int!, ET: Int!, TS: Int!, DST: Int!, DBS: Int!): createTimerResolverOutput',
      resolver: createTimerWithMacResolver
    }
  ],
  queries: [],
});



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
      authStrategy,
      adminPath: "/backend/admin",
      apiPath: "/backend/admin/api",
      graphiqlPath: "/backend/admin/graphiql",
      enableDefaultRoute: false,
    }),
    //new StaticApp({ path: "/static", src: "../../hue_web/build/images" }),
    //new StaticApp({ path: "/", src: "../HueliteWeb/build", fallback: 'index.html', }),
  ],
  HUE_PRODUCTS,
  HUE_TIMERS,
  HUE_LDB,
};


export type logFun_t = (s: string) => void;

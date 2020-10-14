"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Keystone = require("@keystonejs/keystone").Keystone;
var TText = require("@keystonejs/fields").Text;
var GraphQLApp = require("@keystonejs/app-graphql").GraphQLApp;
var AdminUIApp = require("@keystonejs/app-admin-ui").AdminUIApp;
var StaticApp = require("@keystonejs/app-static").StaticApp;
var MongooseAdapter = require("@keystonejs/adapter-mongoose").MongooseAdapter;
var expressSession = require("express-session");
var MongoStore = require("connect-mongo")(expressSession);
//check
var Adapter = require("@keystonejs/adapter-mongoose").MongooseAdapter;
//::Lists Imports
var SubscriberSchema = require("../../src/lists/subscriberList");
var ProductSchema = require("../../src/lists/productList");
var VarientSchema = require("../../src/lists/varientList");
var SelectorDatasetSchema = require("../../src/lists/selectorData");
var SelectorSchema = require("../../src/lists/selectorList");
var FeaturesSchema = require("../../src/lists/featuresList");
var HUE_PRODUCT_Schema = require("../../src/lists/HUEProduct");
var HUE_TIMER_Schema = require("../../src/lists/HUETimer");
var HUE_LDB_Schema = require("../../src/lists/HUE_ldb");
//::Custom Imports
var Express_1 = require("./Express");
//::Server Configurations
var PROJECT_NAME = "hue_server";
var adapterConfig = { mongoUri: "mongodb://localhost:27017/huelite" };
//::Keystone Configurations
//@ts-ignore
var keystone = new Keystone({
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
var HUE_PRODUCTS = keystone.createList("hue_product", HUE_PRODUCT_Schema);
//@ts-ignore
var HUE_TIMERS = keystone.createList("hue_timer", HUE_TIMER_Schema);
var HUE_LDB = keystone.createList("hue_ldb", HUE_LDB_Schema);
//::keystone Apps
module.exports = {
    keystone: keystone,
    configureExpress: function (app) {
        app.set("trust proxy", true);
    },
    apps: [
        new Express_1.Express(),
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
    ],
    HUE_PRODUCTS: HUE_PRODUCTS,
    HUE_TIMERS: HUE_TIMERS,
    HUE_LDB: HUE_LDB,
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authStrategy = exports.HUE_LDB = exports.HUE_TIMERS = exports.HUE_PRODUCTS = exports.keystone = void 0;
var Keystone = require("@keystonejs/keystone").Keystone;
var TText = require("@keystonejs/fields").Text;
var GraphQLApp = require("@keystonejs/app-graphql").GraphQLApp;
var AdminUIApp = require("@keystonejs/app-admin-ui").AdminUIApp;
var StaticApp = require("@keystonejs/app-static").StaticApp;
var MongooseAdapter = require("@keystonejs/adapter-mongoose").MongooseAdapter;
var expressSession = require("express-session");
var MongoStore = require("connect-mongo")(expressSession);
var PasswordAuthStrategy = require('@keystonejs/auth-password').PasswordAuthStrategy;
//check
var Adapter = require("@keystonejs/adapter-mongoose").MongooseAdapter;
//::Lists Imports
var SubscriberSchema = require("./lists/subscriberList");
var ProductSchema = require("./lists/productList");
var VarientSchema = require("./lists/varientList");
var SelectorDatasetSchema = require("./lists/selectorData");
var SelectorSchema = require("./lists/selectorList");
var FeaturesSchema = require("./lists/featuresList");
var HUE_PRODUCT_Schema = require("./lists/HUEProduct");
var HUE_TIMER_Schema = require("./lists/HUETimer");
var HUE_LDB_Schema = require("./lists/HUE_ldb");
var UserSchema = require("./lists/userList");
//::Custom Imports
var Express_1 = require("./Express");
var timerResolver_1 = require("./services/resolvers/timerResolver");
//::Server Configurations
var PROJECT_NAME = "hue_server";
var adapterConfig = { mongoUri: "mongodb://localhost:27017/huelite" };
//::Keystone Configurations
//@ts-ignore
exports.keystone = new Keystone({
    name: PROJECT_NAME,
    //adapter: new Adapter(adapterConfig),
    adapter: new MongooseAdapter(adapterConfig),
    sessionStore: new MongoStore({
        url: "mongodb://localhost:27017/hue_session",
    }),
    cookieSecret: ",hjsbd;fjnsad,mvn'aiorwjnb",
});
//::List Creations
exports.keystone.createList("subscriber", SubscriberSchema);
exports.keystone.createList("product", ProductSchema);
exports.keystone.createList("varient", VarientSchema);
exports.keystone.createList("selectorDataset", SelectorDatasetSchema);
exports.keystone.createList("selector", SelectorSchema);
exports.keystone.createList("featuresList", FeaturesSchema);
exports.keystone.createList("user", UserSchema);
exports.HUE_PRODUCTS = exports.keystone.createList("hue_product", HUE_PRODUCT_Schema);
//@ts-ignore
exports.HUE_TIMERS = exports.keystone.createList("hue_timer", HUE_TIMER_Schema);
exports.HUE_LDB = exports.keystone.createList("hue_ldb", HUE_LDB_Schema);
exports.authStrategy = exports.keystone.createAuthStrategy({
    type: PasswordAuthStrategy,
    list: 'user',
    config: {
        identityField: 'email',
        secretField: 'password',
    },
});
exports.keystone.extendGraphQLSchema({
    types: [
        {
            type: timerResolver_1.timerUpdateResolverOutput,
        }, {
            type: timerResolver_1.type_TimerObj,
        }, {
            type: timerResolver_1.type_timerLdbObj,
        }, {
            type: timerResolver_1.createTimerResolverOutput,
        }
    ],
    mutations: [
        {
            schema: 'updateTimer(Mac: String!, HR: Int!, MIN:Int!, DAYS: Int!, DT: Int!, ET: Int!, TS: Int!, DST: Int!, DBS: Int!): timerUpdateResolverOutput',
            resolver: timerResolver_1.timerUpdateResolver,
        }, {
            schema: 'createTimerWithDeviceMac(Mac: String!, HR: Int!, MIN:Int!, DAYS: Int!, DT: Int!, ET: Int!, TS: Int!, DST: Int!, DBS: Int!): createTimerResolverOutput',
            resolver: timerResolver_1.createTimerWithMacResolver
        }
    ],
    queries: [],
});
//::keystone Apps
module.exports = {
    keystone: exports.keystone,
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
            authStrategy: exports.authStrategy,
            adminPath: "/backend/admin",
            apiPath: "/backend/admin/api",
            graphiqlPath: "/backend/admin/graphiql",
            enableDefaultRoute: false,
        }),
    ],
    HUE_PRODUCTS: exports.HUE_PRODUCTS,
    HUE_TIMERS: exports.HUE_TIMERS,
    HUE_LDB: exports.HUE_LDB,
};

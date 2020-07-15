const express = require("express");
const app = express();

const ACCESS_WEB_TOKEN =
  "a12b941c6e38e63915ed207b73e32b0cef620cbb8167c151b1c4407efa7207b1c0905d1d880e92b7813342675fe0965183ef3cc97554d72e56cab120e6c9ba79";

class Express {
  prepareMiddleware({ keystone, dev, distDir }) {
    app.set("base", "backend");
    app.set("keystone", keystone);

    return app;
  }
}

module.exports = { Express };

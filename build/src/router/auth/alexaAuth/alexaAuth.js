"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var authHandler_1 = require("../authHandler");
authHandler_1.AuthRouter.get('/aa', function (req, res) {
    res.send('Wiki home page');
});
/**
 * @path Alexa auth Access Token URI
 */
authHandler_1.AuthRouter.get('/aaat', function (req, res) {
    res.send('Wiki home page');
});

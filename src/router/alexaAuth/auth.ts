const express = require("express");
export var AuthRouter = express.Router();

AuthRouter.get('/aa', function (req: any, res: any) {
    res.send('Wiki home page');
})


/**
 * @path Alexa auth Access Token URI
 */
AuthRouter.get('/aaat', function (req: any, res: any) {
    res.send('Wiki home page');
})
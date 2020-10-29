const passport = require('passport')
const express = require("express");
export var googleAuthRouter = express.Router();
const googleStatergy = require("./googleStatergy")
const http = require('http');
const url = require('url');


function redirect(response: any, url: any) {
    response.writeHead(302, {
        Location: url,
    });
    response.end();
}

googleAuthRouter.get("/", passport.authenticate('google', { scope: ['profile', 'email'] }))

googleAuthRouter.get("/redirect", async (req: any, res: any) => {
    return res.send("test google auth")
})

googleAuthRouter.get("/proxy", async (req: any, res: any) => {
    const parameters = url.parse(req.url, true).query;
    console.log(">>>>>" + JSON.stringify(parameters))
    if (parameters.authServiceUrl) {
        // redirect user to the authUrl
        console.log("<<<" + decodeURIComponent(parameters.authServiceUrl))
        return res.redirect(decodeURIComponent(parameters.authServiceUrl));
    }
    // redirect response from the auth service to your application
    return redirect(res, "hueite_app://")
})
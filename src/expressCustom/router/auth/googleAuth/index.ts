const passport = require('passport')
const express = require("express");
export var googleAuthRouter = express.Router();
const googleStatergy = require("./googleStatergy")
const http = require('http');
const url = require('url');
var deeplink = require('node-deeplink');
const path = require('path');

function redirect(response: any, url: any) {
    response.writeHead(302, {
        Location: url,
        host: "hueiteapp://"
    });
    response.end();
}

googleAuthRouter.get("/", passport.authenticate('google', { scope: ['profile', 'email'] }))

googleAuthRouter.get("/redirect", async (req: any, res: any) => {
    return redirect(res, "googleLoginRedirect")
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
    console.log(">> redirecting to app")
    return res.status(301).redirect("/deeplink")
})

googleAuthRouter.get("/deeplink", deeplink({
    fallback: 'https://www.huelite.in/backend/auth/google',
    android_package_name: 'com.abhi6676.node',
    ios_store_link:
        'https://itunes.apple.com/us/app/cups-unlimited-coffee/id556462755?mt=8&uo=4'
}))

googleAuthRouter.get("/deeplinktest", async (req: any, res: any) => {
    console.log("deeplink test" + path.join(__dirname + '/index.html'))
    return res.sendFile(path.join(__dirname + '/index.html'));
})
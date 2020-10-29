const express = require("express");
export var hueAuthRouter = express.Router();
import { userInfo } from "os";
import { authStrategy, logFun_t } from "../../../index"
import { findUserWithEmail } from "../../../services/dbHelper/userDbHelper";


hueAuthRouter.post('/signin', async (req: any, res: any) => {
    const log: logFun_t = (s) => { console.log("<<SIGNIN POST ROUTE>> " + s) }
    loginWithEmail(req, res, log).then(({ success }) => {
        log("fetching userData")
        findUserWithEmail({ email: req?.body?.email }, log).then((user) => {
            if (user) {
                return res.json({ success: true, data: user })
            } else {
                return res.json({ success: false, error: "USER DATA NOT FOUND" })
            }
        }).catch((error) => {
            log('login failedsearch user error >>> ' + JSON.stringify(error))
            return res.json({ success: false, error: error })
        })
    }).catch(({ success, message }) => {
        log('login failed >> message => ' + JSON.stringify(message))
        return res.json({ success: false, error: message })
    })
    return;
});

const loginWithEmail = async (req: any, res: any, _log?: logFun_t): Promise<{ success: boolean }> => new Promise(async (resolve, reject) => {
    const log: logFun_t = (s) => { _log && console.log("[ loginWithEmail ] " + s) }
    log(">>" + req?.body?.email)
    const email = req?.body?.email;
    const password = req?.body?.password;

    const result = await authStrategy.validate({
        email,
        password,
    });

    if (result.success) {
        // Create session and redirect
        log("login successful ")
        resolve({ success: true })
    } else {
        // Return the failure
        log("login Failed")
        reject({ success: false, message: result.message })
    }
})


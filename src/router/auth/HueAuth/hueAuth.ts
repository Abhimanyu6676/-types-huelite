const express = require("express");
export var hueAuthRouter = express.Router();
import { authStrategy, logFun_t } from "../../../index"
import { findUserWithEmail } from "../../../services/dbHelper/userDbHelper";


hueAuthRouter.post('/signin', async (req: any, res: any) => {
    const log: logFun_t = (s) => { console.log("<<SignInForUserData>> " + s) }
    console.log(">>" + req?.body?.email)
    const email = req?.body?.email;
    const password = req?.body?.password;

    const result = await authStrategy.validate({
        email,
        password,
    });

    if (result.success) {
        // Create session and redirect
        const user = await findUserWithEmail({ email: req?.body?.email }, log)
        return res.json({ success: true, data: user })
    }

    // Return the failure
    return res.json({ success: false, message: result.message });
});

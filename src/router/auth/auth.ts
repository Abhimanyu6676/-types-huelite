const express = require("express");
export var router = express.Router();

router.get('/', function (req: any, res: any) {
    res.send('Wiki home page');
})
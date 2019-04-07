const express = require('express');
const router = express.Router();
const GoogleSpreadsheet = require('google-spreadsheet');

const StackIndex = require('../models/StackIndex.model');
const Stack = require('../models/Stack.model');

const config = require('../config/database');
const passport = require('passport');
require('../config/passport')(passport);

let stocksDoc = new GoogleSpreadsheet(process.env.stocksDoc ? process.env.stocksDoc : config.stocksDoc);
let stockListDoc = new GoogleSpreadsheet(process.env.stockListDoc ? process.env.stockListDoc : config.stockListDoc);
let creds = process.env.googleCreds ? JSON.parse(process.env.googleCreds) : config.googleCreds;


router.get('/', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    stocksDoc.useServiceAccountAuth(creds, function (err) {
        stocksDoc.getInfo(function (err, info) {
            res.json(info.worksheets);
        });
    });
});

router.get('/index', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    let stockIndexList = [];
    stockListDoc.useServiceAccountAuth(creds, function (err) {
        stockListDoc.getRows(1, function (err, rows) {
            for (let i = 0; i < rows.length; i++) {
                let stockIndex = new StackIndex(rows[i]["證券代號"], rows[i]["證券代號"] + " " + rows[i]["證券名稱"], rows[i]["index"]);
                stockIndexList.push(stockIndex);
            }
            res.json(stockIndexList);
        });
    });
});

// GET STOCK BY INDEX
router.get('/index/:index', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    let stockList = [];
    stocksDoc.useServiceAccountAuth(creds, function (err) {
        stocksDoc.getRows(req.params.index, function (err, rows) {
            for (let i = 0; i < rows.length; i++) {
                let stockIndex = new Stack(rows[i]["證券代號"],
                    rows[i]["證券名稱"],
                    rows[i]["成交股數"],
                    rows[i]["成交筆數"],
                    rows[i]["成交金額"],
                    rows[i]["開盤價"],
                    rows[i]["最高價"],
                    rows[i]["最低價"],
                    rows[i]["收盤價"],
                    rows[i]["漲跌"],
                    rows[i]["漲跌價差"],
                    rows[i]["最後揭示買價"],
                    rows[i]["最後揭示買量"],
                    rows[i]["最後揭示賣價"],
                    rows[i]["最後揭示賣量"],
                    rows[i]["本益比"],
                    rows[i]["日期"]);
                stockList.push(stockIndex);
            }
            res.json(stockList);
        });
    });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const GoogleSpreadsheet = require('google-spreadsheet');

let StackIndex = require('../models/StackIndex.model');
let Stack = require('../models/Stack.model');

const passport = require('passport');
require('../config/passport')(passport);

let stocksDoc = new GoogleSpreadsheet('1juBzHZn1vFtbyGEwlDG2_SpO-II1xFYnpCEq-QXx3AI');
let stockListDoc = new GoogleSpreadsheet('19CuAslRE8J6tBkfj3VpCSp6OxMWeNi8z4O8nOdORLb0');
let creds = {
    "type": "service_account",
    "project_id": "lee-project-150612",
    "private_key_id": "f30a03754bf569cf085fb1ed6e4c7c73ab9aee90",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCQU9841+uE+XQK\n2JJ3sYtCsfkWll3C14BQVpqHVpaOfjDcI+PvzbZP49Cj8p3v7x9mR44FOcvDaazc\nzVa/cWBeOAFIVILmv+uiSTcZqtRXbos98emVwdtmgsYUucUMV/WZusYIHBnnSYeR\nYTYsSM7cGO0T6dZqZScPpFUqSeBYVkSEHFBM3G79H9seXwW186ZxnwJfzCkHg7y1\nkW9YqJJh2XFjPTYd50RebAnYMl9OxKX829sW6aSbFPEw6hhbN94AFuNcFmxZgB7m\nY3PJwj1muudUph87xjuDC2hjSPod47Wvmgse5BxzyhakM5GcCf1qq7HgBk9tWb1+\nhc359za7AgMBAAECggEAI9lZZF6phwWJL9p8gxOMEjxvsQ8XafqqSgpA5uX4jptE\nmqGlj96KbsyY+egdF8hPBdI3MhAZj0fT4qJ0bigEtlJ16xfmzdcU+eHyuELo7HCu\nUGwix4p36z4HYoWELt04SX+Nid0lCACJFnDNinFpRF1CogQeuJ24dpesec0Q1w/z\nBfrTVYhfNtM9TkRNTqpEZehjGGeq6DEpJ1bBCauh38roACkHYQxGVfrmZvHaHUkd\nOclo4ww1t5Iy55v0oRVRoxMxEWaSlCHL39L/5MN8y4Laifp3hlBTwtazPz+/Xl3p\nvqQSBJ7BBnsj3Jei+uhsK6S5LF8wT5YYF+L8fXx8VQKBgQDBQEJWopcNBXglcb2s\nYbp4MROHh/ESUVT6V3L4Of1rWEf7sVwu69VRrWEhrsc+TpuNE+l7Etiak4Gr5cFV\ndkV3Xgp1pbVobqPQzjKxUDVTDrsCTs/ICVzOQzgxLXoI6B2kNm2wR9I4LjxlqKSQ\nORxj0OASmEw+I+SerRm+eksizQKBgQC/MOtfFgYuzITJlWyqL6SVC0qNzfGyu+/5\nfPu2UykAUAh+vofD5NH9ujcVdLQ3PkaTdVtKRGKti//mdZlHaz//qr1w71JRxmKt\nkxnf4PfealeJS0zSfomB1RdtTzDOD1+kLsx+LpEJR55vNjWx362h1x0gXiOQdf7r\nQH7W8o+PpwKBgGnBmcxBlDpLCPIs6ajhnqNR8CcWbQYiPkf1/XP8gEPzfwktiY4f\n/5CAOoytUlo1uIifIgH5UVJecPM6e/AiFmf5re2uLrWk/r8xaKqCg3wdrpfXu3v0\nK7axMJoxEfy30ijgpGx5EYEvRFw5yz0mE/RIBagHcon7KIzxnAoScPXtAoGBALCq\ndXPBmCj6VuEmr+h6aaxHaLarzGEKBG8XLEiHg2WEjrT/PdinwdqgjXHICxbY9sIf\nOSHhGwWeTfIYTHCQC+0lSjPnELv7gwc83DXhXWkp/oUhDXWb81gDHcil2kUuM4Q0\nskUOpnpasW22O9uHApx/d6yHEHnWbp3XVN0t+bYVAoGBAJcla2i5XvUgHNEkVkMp\ncq3Ip5wo2/O/pnUuseE5kSdgUFahDTx/R0nzpOdmRReb8KKQ3ziyZjY6aSDblysd\ny4Tz0eXSdrFlnypTrAisuU80PhTsa2bIJq6g7uF2lqEIaSuATVBcKYYVhI/b3nFH\nzCKq3rF79OZ9LKXh9PV2S6DI\n-----END PRIVATE KEY-----\n",
    "client_email": "stock-937@lee-project-150612.iam.gserviceaccount.com",
    "client_id": "103104766292176079951",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/stock-937%40lee-project-150612.iam.gserviceaccount.com"
};

// GET ALL INDEX
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

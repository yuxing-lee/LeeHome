const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

//icon
const favicon = require('serve-favicon');

//JWT
const passport = require('passport');

//DB
const mongoose = require('mongoose');
const config = require('./config/database');

//Routes
const user = require('./routes/user');
const book = require('./routes/book');
const stock = require('./routes/stock');
const schedule = require('./routes/schedule');

//cors
const cors = require('cors');
const corsOptions = {
  "origin": "*",
  "methods": "GET,PUT,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
};

app.use(cors(corsOptions));

mongoose.Promise = require('bluebird');
mongoose.connect(process.env.mangoConnectString ? process.env.mangoConnectString : config.mangoConnectString , { useNewUrlParser: true, promiseLibrary: mongoose.Promise })
    .then(() => console.log('connection succesful'))
    .catch((err) => console.error(err));

app.use(favicon(__dirname + '/src/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': 'false' }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(passport.initialize());
app.use('/api/user', user);
app.use('/api/book', book);
app.use('/api/stock', stock);
app.use('/login', express.static(path.join(__dirname, 'dist')));
app.use('/books', express.static(path.join(__dirname, 'dist')));
app.use('/stock', express.static(path.join(__dirname, 'dist')));

app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

module.exports = app; 

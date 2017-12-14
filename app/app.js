'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var mysql = require('mysql');
const Knex = require("knex");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const index_1 = require("./routes/index");
const people_1 = require("./routes/people");
const users_1 = require("./routes/users");
const userLevel_1 = require("./routes/userLevel");
const cors = require("cors");
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
let connection = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: +process.env.DB_PORT,
    multipleStatements: true
};
app.use((req, res, next) => {
    req.db = Knex({
        client: 'mysql',
        connection: connection,
        pool: {
            min: 0,
            max: 7,
            afterCreate: (conn, done) => {
                conn.query('SET NAMES utf8', (err) => {
                    done(err, conn);
                });
            }
        },
        debug: true,
        acquireConnectionTimeout: 5000
    });
    next();
});
app.use('/', index_1.default);
app.use('/people', people_1.default);
app.use('/users', users_1.default);
app.use('/userlevel', userLevel_1.default);
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
if (process.env.NODE_ENV === 'development') {
    app.use((err, req, res, next) => {
        res.status(err['status'] || 500);
        res.render('error', {
            title: 'error',
            message: err.message,
            error: err
        });
    });
}
app.use((err, req, res, next) => {
    res.status(err['status'] || 500);
    res.render('error', {
        title: 'error',
        message: err.message,
        error: {}
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map
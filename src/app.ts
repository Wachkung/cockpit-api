'use strict';

//เพิ่ม 
require('dotenv').config();
var mysql = require('mysql');
import Knex = require('knex');
import { MySqlConnectionConfig } from 'knex';

import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import index from './routes/index';
import people from './routes/people';
import users from './routes/users'
import userlevel from './routes/userLevel';
//เพิ่ม cors
import * as cors from 'cors';

const app: express.Express = express();

//view engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname,'public','favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
//เพิ่ม cors บันทัดนี้
app.use(cors());
//ประกาศตัวแปร Connect Database .env 
let connection: MySqlConnectionConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: +process.env.DB_PORT,
  multipleStatements: true
}

// เรียกใช้งาน ผ่าน Knex  
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


app.use('/',index);
app.use('/people',people);
app.use('/users',users);
app.use('/userlevel',userlevel);

//catch 404 and forward to error handler
app.use((req,res,next) => {
  var err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

//error handlers

//development error handler
//will print stacktrace
if(process.env.NODE_ENV === 'development') {
  app.use((err: Error,req,res,next) => {
    res.status(err['status'] || 500);
    res.render('error',{
      title: 'error',
      message: err.message,
      error: err
    });
  });    
}

//production error handler
// no stacktrace leaked to user
app.use((err: Error,req,res,next) => {
  res.status(err['status'] || 500);
  res.render('error',{
    title: 'error',
    message: err.message,
    error: {}
  });
});

export default app;

'use strict';

import * as express from 'express';
// import { format } from 'morgan';

const router = express.Router();

import { UsersMoldel } from '../models/users';
const usersMoldel = new UsersMoldel();

import {UserLevelMoldel} from '../models/users'
const userLevelMoldel = new UserLevelMoldel();

/* GET home page. */
router.get('/', (req, res, next) => {
    let db = req.db;
    //สร้างตัวแปร มารับค่า ชนิด parameter แบบ get
    usersMoldel.listall(db)
        .then((results: any) => {
            res.send({ok:true,rows:results});
        })
        .catch(error => {
            res.send({ ok: false, error: error })
        })
        .finally(() => {
            db.destroy();
        })
});
router.get('/where/:level', (req, res, next) => {
    let db = req.db;
    let level=req.params.level;
    //สร้างตัวแปร มารับค่า ชนิด parameter แบบ get
    usersMoldel.listpost(db,level)
        .then((results: any) => {
            res.send({ok:true,rows:results});
        })
        .catch(error => {
            res.send({ ok: false, error: error })
        })
        .finally(() => {
            db.destroy();
        })
});

router.post('/', (req, res, next) => {
    let db = req.db;
    //สร้างตัวแปร มารับค่า ชนิด parameter แบบ get
    userLevelMoldel.listall(db)
        .then((results: any) => {
            res.send({ok:true,rows:results});
        })
        .catch(error => {
            res.send({ ok: false, error: error })
        })
        .finally(() => {
            db.destroy();
        })
});

export default router;
'use strict';

import * as express from 'express';
// import { format } from 'morgan';

const router = express.Router();

import {UserLevelMoldel} from '../models/userLevel'
const userLevelMoldel = new UserLevelMoldel();

/* GET home page. */
router.post('/ulevel', (req, res, next) => {
    let db = req.db;
    // let var_ul_id = '5';
    // let var_ul_name ='ผอ . รพ';
    let var_ul_id = req.body.ul_id;
    let var_ul_name =req.body.ul_name;

    let Datas:any ={
        ul_id:var_ul_id,
        ul_name:var_ul_name
    }
    //สร้างตัวแปร มารับค่า ชนิด parameter แบบ get
    userLevelMoldel.add(db,Datas)
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
router.delete('/:del_level', (req, res, next) => {
    let db = req.db;
    let del_level=req.params.del_level;
    //สร้างตัวแปร มารับค่า ชนิด parameter แบบ get
    userLevelMoldel.del(db,del_level)
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
router.put('/:level_id/:level_name', (req, res, next) => {
    let db = req.db;
    let level_id=req.params.level_id;
    let level_name=req.params.level_name;
    //สร้างตัวแปร มารับค่า ชนิด parameter แบบ get
    userLevelMoldel.update(db,level_id,level_name)
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
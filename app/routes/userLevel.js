'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const userLevel_1 = require("../models/userLevel");
const userLevelMoldel = new userLevel_1.UserLevelMoldel();
router.post('/ulevel', (req, res, next) => {
    let db = req.db;
    let var_ul_id = req.body.ul_id;
    let var_ul_name = req.body.ul_name;
    let Datas = {
        ul_id: var_ul_id,
        ul_name: var_ul_name
    };
    userLevelMoldel.add(db, Datas)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db.destroy();
    });
});
router.post('/', (req, res, next) => {
    let db = req.db;
    userLevelMoldel.listall(db)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db.destroy();
    });
});
router.delete('/:del_level', (req, res, next) => {
    let db = req.db;
    let del_level = req.params.del_level;
    userLevelMoldel.del(db, del_level)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db.destroy();
    });
});
router.put('/:level_id/:level_name', (req, res, next) => {
    let db = req.db;
    let level_id = req.params.level_id;
    let level_name = req.params.level_name;
    userLevelMoldel.update(db, level_id, level_name)
        .then((results) => {
        res.send({ ok: true, rows: results });
    })
        .catch(error => {
        res.send({ ok: false, error: error });
    })
        .finally(() => {
        db.destroy();
    });
});
exports.default = router;
//# sourceMappingURL=userLevel.js.map
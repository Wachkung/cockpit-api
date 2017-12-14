'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const users_1 = require("../models/users");
const usersMoldel = new users_1.UsersMoldel();
const users_2 = require("../models/users");
const userLevelMoldel = new users_2.UserLevelMoldel();
router.get('/', (req, res, next) => {
    let db = req.db;
    usersMoldel.listall(db)
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
router.get('/where/:level', (req, res, next) => {
    let db = req.db;
    let level = req.params.level;
    usersMoldel.listpost(db, level)
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
exports.default = router;
//# sourceMappingURL=users.js.map
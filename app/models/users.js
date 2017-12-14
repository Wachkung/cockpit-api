'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class UsersMoldel {
    listall(knex) {
        return knex('user')
            .limit(10);
    }
    listpost(knex, level) {
        return knex('user')
            .where('level', level);
    }
    listraw(knex) {
        let sql = 'select * from user limit 10';
        return knex.raw(sql);
    }
}
exports.UsersMoldel = UsersMoldel;
class UserLevelMoldel {
    listall(knex) {
        return knex('user_level');
    }
    listraw(knex) {
        let sql = 'select * from cockpit_user';
        return knex.raw(sql);
    }
}
exports.UserLevelMoldel = UserLevelMoldel;
//# sourceMappingURL=users.js.map
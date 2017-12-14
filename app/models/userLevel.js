'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class UserLevelMoldel {
    listall(knex) {
        return knex('user_level');
    }
    listraw(knex) {
        let sql = 'select * from cockpit_user';
        return knex.raw(sql);
    }
    add(knex, Datas) {
        return knex('user_level')
            .insert(Datas);
    }
    del(knex, level_del) {
        return knex('user_level')
            .where('ul_id', level_del)
            .del();
    }
    update(knex, level_id, level_name) {
        return knex('user_level')
            .where('ul_id', level_id)
            .update('ul_name', level_name);
    }
}
exports.UserLevelMoldel = UserLevelMoldel;
//# sourceMappingURL=userLevel.js.map
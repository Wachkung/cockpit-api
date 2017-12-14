'use strict';
import Knex = require('knex');

export class UserLevelMoldel {
    listall(knex: Knex) {//มีค่า เท่ากับ select * from cockpit_user
        return knex('user_level');
    }
    listraw(knex:Knex){
        let sql ='select * from cockpit_user';
        return knex.raw(sql);
    }
    add(knex: Knex,Datas:any) {
        return knex('user_level')
        .insert(Datas)
    }
    del(knex: Knex,level_del:any) {
        return knex('user_level')
        .where('ul_id',level_del)
        .del()
    }
    update(knex: Knex,level_id:any,level_name:any) {
        return knex('user_level')
        .where('ul_id',level_id)
        .update('ul_name',level_name)
    }

}

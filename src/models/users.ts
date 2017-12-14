'use strict';
import Knex = require('knex');

export class UsersMoldel {
    listall(knex: Knex) {//มีค่า เท่ากับ select * from cockpit_user
        return knex('user')
        .limit(10);
    }
    listpost(knex: Knex,level:any) {//มีค่า เท่ากับ select * from cockpit_user
        return knex('user')
        .where('level',level);
    }
    listraw(knex:Knex){
        let sql ='select * from user limit 10';
        return knex.raw(sql);
    }
}
export class UserLevelMoldel {
    listall(knex: Knex) {//มีค่า เท่ากับ select * from cockpit_user
        return knex('user_level');
    }
    listraw(knex:Knex){
        let sql ='select * from cockpit_user';
        return knex.raw(sql);
    }
}

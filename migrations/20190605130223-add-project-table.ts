'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options: any, seedLink: any) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

exports.up = function (db: any, callback: any) {
    db.createTable('projects', {
        id: {
            type: 'int',
            primaryKey: true,
            autoIncrement: true
        },
        name: 'string',
        organisation_id: 'int'
    }, addForeignKey);

    function addForeignKey(err: any) {
        if (err) {
            callback(err);
            return;
        }
        db.addForeignKey('projects', 'organisations', 'organisation_id', {
            'organisation_id': 'id'
        }, {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
        }, callback);
    }

};

exports.down = function (db: any, callback: any) {
    db.dropTable('projects', callback);
};

exports._meta = {
    "version": 1
};
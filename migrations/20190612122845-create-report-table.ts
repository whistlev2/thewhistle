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
    db.createTable(
        'reports', {
            id: {
                type: 'int',
                primaryKey: true,
                autoIncrement: true
            },
            form_id: 'string',
            response_json: 'json',
            date: 'time',
            assignedTo: 'int',
            status: 'string',
            tags: 'string[]',
            active: 'boolean',
            location: 'string'
        },
        addUserForeignKey
    );

    function addUserForeignKey(err: any) {
        if (err) {
            callback(err);
            return;
        }
        db.addForeignKey('users', 'reports', 'assignedTo', {
            'assignedTo': 'id'
        }, {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
        }, callback);
    }
};



exports.down = function (db: any, callback: any) {
    db.dropTable('reports', callback);
};

exports._meta = {
    "version": 1
};
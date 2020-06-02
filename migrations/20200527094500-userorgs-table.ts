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
    db.removeColumn('users', 'organisation_id', createUserorgsTable);
    function createUserorgsTable(err: any) {
        db.createTable(
            'userorgs', {
                id: {
                    type: 'int',
                    primaryKey: true,
                    autoIncrement: true
                },
                user_id: 'int',
                organisation_id: 'int',
                role: 'string'
            },
            addUserForeignKey
        );
    }

    function addUserForeignKey(err: any) {
        if (err) {
            callback(err);
            return;
        }
        db.addForeignKey('userorgs', 'users', 'user_id', {
            'user_id': 'id'
        }, {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
        }, addOrgForeignKey);
    }

    function addOrgForeignKey(err: any) {
        if (err) {
            callback(err);
            return;
        }
        db.addForeignKey('userorgs', 'organisations', 'organisation_id', {
            'organisation_id': 'id'
        }, {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
        }, callback);
    }
};



exports.down = function (db: any, callback: any) {
    db.dropTable('userorgs', callback)
};

exports._meta = {
    "version": 1
};
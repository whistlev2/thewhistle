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
    db.createTable('notes', {
        id: {
            type: 'int',
            primaryKey: true,
            autoIncrement: true
        },
        report_id: 'int',
        user_id: 'int',
        time: 'datetime',
        comment: 'string'
    }, addReportForeignKey);

    function addReportForeignKey(err: any) {
        if (err) {
            callback(err);
            return;
        }
        db.addForeignKey('notes', 'reports', 'report_id', {
            'report_id': 'id'
        }, {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
        }, addUserForeignKey);
    }

    function addUserForeignKey(err: any) {
        if (err) {
            callback(err);
            return;
        }
        db.addForeignKey('notes', 'users', 'user_id', {
            'user_id': 'id'
        }, {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
        }, callback);
    }
};



exports.down = function (db: any, callback: any) {
    db.dropTable('notes', callback);
};

exports._meta = {
    "version": 1
};
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
    db.createTable('questionresponses', {
        id: {
            type: 'int',
            primaryKey: true,
            autoIncrement: true
        },
        report: 'int',
        section: 'int',
        question_ref: 'string',
        definition: 'json',
        value: 'string',
    }, addReportForeignKey);

    function addReportForeignKey(err: any) {
        if (err) {
            callback(err);
            return;
        }
        db.addForeignKey('questionresponses', 'reports', 'report', {
            'report': 'id'
        }, {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
        }, addSectionForeignKey);
    }

    function addSectionForeignKey(err: any) {
        if (err) {
            callback(err);
            return;
        }
        db.addForeignKey('questionresponses', 'formsections', 'section', {
            'section': 'id'
        }, {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
        }, callback);
    }
};



exports.down = function (db: any, callback: any) {
    db.dropTable('questionresponses', callback);
};

exports._meta = {
    "version": 1
};
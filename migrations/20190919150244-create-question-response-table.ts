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
        question_ref: 'string',
        raw_response_id: 'int',
        value: 'json',
        definition: 'json'
    }, addRawResponseForeignKey);

    function addRawResponseForeignKey(err: any) {
        if (err) {
            callback(err);
            return;
        }
        db.addForeignKey('questionresponses', 'rawresponse', 'raw_response_id', {
            'raw_response_id': 'id'
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
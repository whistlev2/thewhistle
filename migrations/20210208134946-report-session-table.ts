'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options: any, seedLink: any): any {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

exports.up = function(db: any, callback: any): any {
    db.createTable(
        'reportsessions', {
            id: {
                type: 'int',
                primaryKey: true,
                autoIncrement: true
            },
            current_section: 'int', //eslint-disable-line
            stack: 'json',
            verification_code: 'string' //eslint-disable-line 
        },
        addSectionForeignKey
    );

    function addSectionForeignKey(err: any): any {
        if (err) {
            callback(err);
            return;
        }
        db.addForeignKey('reportsessions', 'formsections', 'current_section', {
            'current_section': 'id'
        }, {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
        }, callback);
    }
};

exports.down = function(db: any, callback: any): any {
    db.dropTable('reportsessions', callback);
};

exports._meta = {
    "version": 1
};

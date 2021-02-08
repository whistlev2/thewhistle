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
        'formmappings', {
            id: {
                type: 'int',
                primaryKey: true,
                autoIncrement: true
            },
            form: 'int',
            mapping: 'int'
        },
        addFormForeignKey
    );

    function addFormForeignKey(err: any): any {
        if (err) {
            callback(err);
            return;
        }
        db.addForeignKey('formmappings', 'forms', 'form', {
            'form': 'id'
        }, {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
        }, addMappingForeignKey);
    }

    function addMappingForeignKey(err: any): any {
        if (err) {
            callback(err);
            return;
        }
        db.addForeignKey('formmappings', 'mapping', 'mapping', {
            'mapping': 'id'
        }, {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
        }, callback);
    }
};

exports.down = function(db: any, callback: any): any {
    db.dropTable('formmappings', callback);
};

exports._meta = {
    "version": 1
};

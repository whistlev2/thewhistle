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
        'reportsessionrelation', {
            id: {
                type: 'int',
                primaryKey: true,
                autoIncrement: true
            },
            report: 'int',
            session: 'int'
        },
        addReportForeignKey
    );

    function addReportForeignKey(err: any): any {
        if (err) {
            callback(err);
            return;
        }
        db.addForeignKey('reportsessionrelation', 'reports', 'report', {
            'report': 'id'
        }, {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
        }, addSessionForeignKey);
    }

    function addSessionForeignKey(err: any): any {
        if (err) {
            callback(err);
            return;
        }
        db.addForeignKey('reportsessionrelation', 'reportsessions', 'session', {
            'session': 'id'
        }, {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
        }, callback);
    }
};

exports.down = function(db: any, callback: any): any {
    db.dropTable('reportsessionrelation', callback);
};

exports._meta = {
    "version": 1
};

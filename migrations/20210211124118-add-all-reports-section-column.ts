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
    db.addColumn('formsections', 'all_reports', { type: 'boolean' }, callback)
};

exports.down = function(db: any, callback: any): any {
    db.removeColumn('formsections', 'all_reports', callback)
};

exports._meta = {
    "version": 1
};

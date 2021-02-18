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
    function addAttemptsColumn(): void {
        db.addColumn('users', 'login_attempts', { type: 'int'}, callback);
    }

    db.addColumn('users', 'verification_code', { type: 'string' }, addAttemptsColumn);
};

exports.down = function(db: any, callback: any): any {
    function removeAttemptsColumn(): void {
        db.removeColumn('users', 'login_attempts', callback);
    }
    db.removeColumn('users', 'verification_code', removeAttemptsColumn);
};

exports._meta = {
    "version": 1
};

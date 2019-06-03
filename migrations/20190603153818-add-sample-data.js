'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.runSql(`insert into pets (id, name) values (1, 'roverrr')`, callback);
  // db.insert("pets", ["id", "name"], ["1", "rover"], callback);
};

exports.down = function(db, callback) {
  db.runSql(`DELETE FROM pets WHERE name='roverrr';`, callback);
};

exports._meta = {
  "version": 1
};

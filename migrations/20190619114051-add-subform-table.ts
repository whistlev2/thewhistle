'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
  exports.up = function(db: any, callback: any) {
    db.createTable('subforms', {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      typeform_id: 'string',
      form_json: 'json',
      timestamp: 'timestamp'
    }, callback);
  };

  exports.down = function(db: any, callback: any) {
    db.dropTable('subforms', callback);
  };

exports._meta = {
  "version": 1
};

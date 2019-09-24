'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options: any, seedLink: any) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db: any, callback: any) {
  db.createTable('userforms', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    user_id: 'int',
    form_id: 'int',
    user_role: 'string',
    created_at: {type: 'timestamp', notNull: true, defaultValue: 'NOW'},
  }, addUserForeignKey);

  function addUserForeignKey(err: any) {
    if (err) { callback(err); return; }
    db.addForeignKey('userforms', 'users', 'user_id',
    {
      'user_id': 'id'
    },
    {
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    }, addFormForeignKey);
  }

  function addFormForeignKey(err: any) {
    if (err) { callback(err); return; }
    db.addForeignKey('userforms', 'subforms', 'form_id',
    {
      'form_id': 'id'
    },
    {
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    }, callback);
  }

};

exports.down = function(db: any, callback: any) {
  db.dropTable('userforms', callback);
};

exports._meta = {
  "version": 1
};

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
      slug: 'string',
      typeform_id: 'string',
      test_typeform_id: 'string',
      organisation_id: 'int',
      form_json: 'json',
      test_form_json: 'json',
      published: {type: 'boolean', defaultValue: false},
      created_at: {type: 'timestamp', notNull: true, defaultValue: 'NOW'},
      edit_at: {type: 'timestamp', notNull: true, defaultValue: 'NOW'},
    }, addOrganisation);

    function addOrganisation(err: any) {
      if (err) { callback(err); return; }
      db.addForeignKey('subforms', 'organisations', 'organisation_id',
      {
        'organisation_id': 'id'
      },
      {
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
      }, callback);
    }
  };

  exports.down = function(db: any, callback: any) {
    db.dropTable('subforms', callback);
  };

exports._meta = {
  "version": 1
};

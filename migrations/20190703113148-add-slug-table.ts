'use strict';

var dbm;
var type;
var seed;

exports.up = function(db: any, callback: any) {
  db.createTable('slugs', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    slug: 'string',
    form_id: 'int',
  }, addForeignKey);

  function addForeignKey(err: any) {
    if (err) { callback(err); return; }
    db.addForeignKey('slugs', 'subforms', 'form_id',
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
  db.dropTable('slugs', callback);
};

exports._meta = {
  "version": 1
};

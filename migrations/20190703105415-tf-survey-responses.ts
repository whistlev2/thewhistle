'use strict';

var fs = require('fs');
var path = require('path');

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
  exports.up = function(db: any, callback: any) {
    var filePath = path.join(__dirname + '/seeds/survey.json');
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err: any, data: any){
      var tst = `{"id": "nYkngh","title": "Whistle","theme": {"href": "https://api.typeform.com/themes/6lPNE6"}}`
      db.runSql(`insert into subforms (id, typeform_id, form_json) values (2, 'nYkngh', ${tst})`, callback)
    })
  };

  exports.down = function(db: any, callback: any) {
    db.runSql(`DELETE FROM subforms WHERE id=2;`, callback);
  };

exports._meta = {
  "version": 1
};

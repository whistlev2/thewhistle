'use strict';

var dbm;
var type;
var seed;
//TODO: Change to typescript
/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

exports.up = function (db, callback) {
    createFormSections();

    function createFormSections() {
        db.createTable('formsections', {
            id: {
                type: 'int',
                primaryKey: true,
                autoIncrement: true
            },
            form: 'int',
            type: 'string',
            json: 'json',
            test_json: 'json',
            on_complete: 'json',
            test_on_complete: 'json'
        }, createForms);
    }

    function createForms(err) {
        if (err) {
            callback(err);
            return;
        }
        db.createTable('forms', {
            id: {
                type: 'int',
                primaryKey: true,
                autoIncrement: true
            },
            organisation: 'int',
            title: 'string',
            description: 'string',
            slug: 'string',
            web: 'boolean',
            published: {type: 'boolean', defaultValue: false},
            created: {type: 'timestamp', notNull: true, defaultValue: 'NOW'},
            edited: {type: 'timestamp', notNull: true, defaultValue: 'NOW'},
            first_section: 'int'
        }, addFormForeignKey);
    }

    function addFormForeignKey(err) {
        if (err) {
            callback(err);
            return;
        }
        db.addForeignKey('formsections', 'forms', 'form', {
            'form': 'id'
        }, {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
        }, createTypeforms);
    }

    function addFormOrgForeignKey(err) {
        if (err) {
            callback(err);
            return;
        }
        db.addForeignKey('forms', 'organisations', 'organisation', {
            'organisation': 'id'
        }, {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
        }, addFormSectionForeignKey);
    }

    function addFormSectionForeignKey(err) {
        if (err) {
            callback(err);
            return;
        }
        db.addForeignKey('forms', 'formsections', 'first_section', {
            'first_section': 'id'
        }, {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
        }, createTypeforms);
    }

    function createTypeforms(err) {
        if (err) {
            callback(err);
            return;
        }
        db.createTable('typeforms', {
            id: {
                type: 'int',
                primaryKey: true,
                autoIncrement: true
            },
            form_section: 'int',
            typeform_id: 'string',
            test_typeform_id: 'string'
        }, addTypeformForeignKey);
    }

    function addTypeformForeignKey(err) {
        if (err) {
            callback(err);
            return;
        }
        db.addForeignKey('typeforms', 'formsections', 'form_section', {
            'form_section': 'id'
        }, {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
        }, callback);
    }
};

exports.down = function (db, callback) {
    db.removeColumn('formsections', 'form', () => {
        db.dropTable('typeforms', () => {
            db.dropTable('forms', () => {
                db.dropTable('formsections', callback);
            })
        })
    });
    
};

exports._meta = {
    "version": 1
};
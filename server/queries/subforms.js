const db = require('../db.ts')

//TODO: Delete if not needed
exports.updateTestJSON = function (slug, form, res) {
    db.query(`UPDATE subforms SET form_json='${form}' WHERE slug='${slug}'`, (error, results) => {
        if (error) {
            throw error;
        }
        res.redirect(`/edit-form/${slug}`);
    });
}

//TODO: Delete if not needed
exports.getTestJSON = async function (slug) {
    const { rows } = await db.query(`SELECT test_form_json FROM subforms WHERE slug='${slug}'`);
    return rows[0].test_form_json;
}

const db = require('../db.ts')

exports.updateTestJSON = function (slug, form, res) {
    db.query(`UPDATE subforms SET form_json='${form}' WHERE slug='${slug}'`, (error, results) => {
        if (error) {
            console.log(error);
            throw error;
        }
        res.redirect(`/edit-form/${slug}`);
    });
}

exports.getTestJSON = async function (slug) {
    const { rows } = await db.query(`SELECT test_form_json FROM subforms WHERE slug='${slug}'`);
    return rows[0].test_form_json;
}

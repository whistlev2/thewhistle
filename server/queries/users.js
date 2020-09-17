const db = require('../db.ts')

const bcrypt = require('bcrypt')

// TODO - combine the users.js API functions with this file


exports.getUserOrgs = async function (userID) {
    const results = await db.query(`SELECT organisations.id, organisations.name, organisations.active, userorgs.role FROM organisations JOIN userorgs ON organisations.id=userorgs.organisation WHERE userorgs.user=${userID}`)
    return results.rows;
}

exports.getUsers = async function (userID) {
    const userOrgs = await this.getUserOrgs(userID);
    let userOrgIDs = userOrgs.map(el => el.id)
    let userOrgString = `(${userOrgIDs.join(',')})`
    let results = await db.query(`select users.id, first_name, surname, email, organisations.id as org_id, organisations."name" as org_name, userorgs."role" as user_role from users join userorgs on userorgs."user" = users.id join organisations on organisations.id = userorgs.organisation where organisations.id in ${userOrgString}`)
    let rows = results.rows;
    let usersObj = {}
    for (let i = 0; i < rows.length; i++) {
        if (usersObj.hasOwnProperty(rows[i].id)) {
            usersObj[rows[i].id].orgs.push({
                id: rows[i].org_id,
                name: rows[i].org_name,
                role: rows[i].user_role
            });
            usersObj[rows[i].id].canEdit = usersObj[rows[i].id].canEdit || userOrgIDs.includes(rows[i].id);
        } else {
            usersObj[rows[i].id] = {
                id: rows[i].id,
                firstName: rows[i].first_name,
                surname: rows[i].surname,
                email: rows[i].email,
                orgs: [{
                    id: rows[i].org_id,
                    name: rows[i].org_name,
                    role: rows[i].user_role
                }],
                canEdit: userOrgIDs.includes(rows[i].id)
            };
        }
    }

    return Object.values(usersObj);
}

exports.getAllUsers = function (res) {
    db.query(`SELECT * FROM users`, (error, results) => {
        res.json(results.rows)
    })
}

exports.getOrgUsers = function (res, orgId) {
    db.query(`SELECT * FROM users where organisation=${orgId}`, (error, results) => {
        res.json(results.rows)
    })
}

exports.getUser = async function (userID) {
    const user = await db.query(`SELECT * FROM users WHERE id='${userID}'`);
    return user.rows[0];
}

async function hashPassword(password) {
    let salt = await bcrypt.genSalt();
    let hash = await bcrypt.hash(password, salt);
    return hash;
}

exports.createUser = async function (user) {
    try {
        let hash = await hashPassword(user.password);

        let query = `INSERT INTO users(first_name, surname, email, password) VALUES($1, $2, $3, $4) RETURNING id`;
        let values = [user.firstName, user.surname, user.email, hash];
        let results = await db.query(query, values);
        const userID = results.rows[0].id;

        for (let i = 0; i < user.orgs.length; i++) {
            query = `INSERT INTO userorgs("user", organisation, "role") VALUES($1, $2, $3)`;
            values = [userID, user.orgs[i].id, user.orgs[i].role];
            await db.query(query, values);
        }
    } catch (err) {
        console.log('Error creating user', err);
        //TODO: Handle errors properly
    }
}
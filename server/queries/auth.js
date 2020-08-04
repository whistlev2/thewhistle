const bcrypt = require('bcrypt')

const db = require('../db.ts')

const user = {
    id: 1,
    name: 'BOB',
    email: "test@tst.com",
    org: "TestOrg",
    password: "bob"
}

exports.serializeUser = function (user, done) {
    return done(null, user.id)
}


exports.createNewUser = function (email, password, firstName, surname, organisations) {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) return err
            const query = 'INSERT INTO users(email, password, first_name, surname) VALUES($1, $2, $3, $4) RETURNING id'
            const values = [email, hash, firstName, surname];

            db.query(query, values, (error, results) => {
                if (error) {
                    console.error(error);
                } else {
                    const userID = results.rows[0].id;
                    addUserOrgs(userID, organisations);
                }
            })
        })
    })
}

function addUserOrgs(userID, organisations) {
    const query = 'INSERT INTO userorgs(user, organisation) VALUES($1, $2)';
    for (let i = 0; i < organisations.length; i++) {
        let values = [userID, organisations[i]];
        db.query(query, values, (error, results) => {
            if (error) {
                console.error(error);
            }
        })
    }
}

exports.updatePassword = function (id, currentPassword, newPassword) {
    db.query(`SELECT * FROM users WHERE id='${id}'`, (error, results) => {
        if (error) {
            done(error)
        }
        var user = results.rows[0]
        bcrypt.compare(currentPassword, user.password, (err, isMatch) => {
            if (err) return next(err)
            saveNewPassword(id, newPassword)
        })
    })
}

function saveNewPassword(id, newPassword) {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)
        bcrypt.hash(newPassword, salt, (err, hash) => {
            if (err) return err
            db.query(`UPDATE users SET password='${hash}' WHERE id='${id}'`, (error, results) => {
                if (error) {
                    throw error;
                }
            })
        })
    })
}

exports.deserializeUser = function (id, done) {
    db.query(`SELECT * FROM users JOIN organisations ON organisations.id = users.organisation WHERE users.id='${id}'`, (error, results) => {
        if (error) {
            done(error)
        }
        var user = results.rows[0]
        return done(error, user)
    })
}

/* function (username, password, done) {
    User.findOne({
        username: username
    }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        if (!user.verifyPassword(password)) {
            return done(null, false);
        }
        return done(null, user);
    });
} */

async function getUserOrgs(userID) {
    const results = await db.query(`SELECT organisations.id, organisations.name, organisations.active, userorgs.role FROM organisations JOIN userorgs ON organisations.id=userorgs.organisation WHERE userorgs.user=${userID}`)
    return results.rows;
}

exports.authenticateUser = async function (email, password) {
    const results = await db.query(`SELECT * FROM users WHERE email='${email}'`)
    const user = results.rows[0];
    user.orgs = await getUserOrgs(user.id);
    if (!user) {
        return null;
    }
    const match = await bcrypt.compare(password, user.password)
    user.password = null;
    return match ? user : null;
}
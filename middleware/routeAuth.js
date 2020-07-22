const jwt = require('jsonwebtoken');
const { pathExistsSync } = require('fs-extra');

function requiresVerification(path) {
    if (path == '/login') {
        return false;
    } else if (path == '/favicon.ico') {
        return false;
    } else if (path.startsWith('/_nuxt/')) {
        return false;
    } else if (path.startsWith('/vuetify.css.map')) {
        return false;
    } else if (path.startsWith('/__webpack_hmr/')) {
        return false;
    }
    return true;
}

async function verify(req, res, next) {
    //TODO: Make login flow work better
    if (requiresVerification(req.originalUrl)) {
        console.log(req.originalUrl, 'Verifying')
        try {
            console.log(req.originalUrl, 'About to check')
            const payload = await jwt.verify(context.store.$auth.user.token, process.env.JWT_SECRET_KEY);
            console.log(req.originalUrl, 'Checked out')
            if (!payload.user) {
                console.log(req.originalUrl, 'Redirecting 1')
                res.redirect('/login');
            }
        } catch {
            console.log(req.originalUrl, 'Redirecting 2')
            res.redirect('/login');
        }
        console.log('Checking out')
    }
    console.log('Carrying on')
    next();
}

module.exports = verify;

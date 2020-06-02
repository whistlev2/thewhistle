async function checkCookie(cookie) {
    let validToken = cookie.startsWith('Bearer ');
    if (!validToken) {
        return false;
    }
    const token = cookie.substr(7);
    try {
        const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        return payload.user;
    } catch {
        return false;
    }

}

export default async function (context) {
    try {
        const tokenCookie = context.req.cookies['auth._token.local'];
        const validatedUser = await checkCookie(tokenCookie);
        if (!validatedUser) {
            context.redirect('/login');
        }
    } catch {
        context.redirect('/login');
    }
}
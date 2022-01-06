const withAuth = (req, res, next) => {
    if (!req.session.user_id)   {
        // not logged in call login
        res.redirect('/login');
    } else {
        // if logged in, move to next function
        next();
    }
}

module.exports = withAuth;
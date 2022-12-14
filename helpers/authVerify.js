function checkAuthenticatde (req, res, next) {
    if(req.isAuthenticated()){
        return next()
    }

    res.redirect('/auth')
}

function checkNotAuthenticated (req, res, next) {
    if(req.isAuthenticated()){
        return res.redirect('/')
    }

    next()
}

module.exports = { checkAuthenticatde, checkNotAuthenticated }
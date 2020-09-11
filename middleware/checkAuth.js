const jwt = require('jsonwebtoken')
const HttpError = require('../models/httperror')

const validateUserIsAuthenticated = req => {
    if (!req.isAuth) {
        throw new HttpError('Restricted access', 403)
    }
}

const validateUserToken = (req, res, next) => {

    try {

        const authHeader = req.get('Authorization')

        if (!authHeader) {
            req.isAuth = false
            return next()
        }

        const token = authHeader.split(' ')[1]
        if (!token || token === '') {
            req.isAuth = false;
            return next()
        }

        let decodedToken = jwt.verify(token, `${process.env.SECRET_WORD}`)
        if (!decodedToken) {
            req.isAuth = false
            return next()
        }

        req.isAuth = true
        req.userId = decodedToken.userId
        next()

    } catch (error) {
        console.log(error);
        req.isAuth = false
        return next()
    }
}

exports.validateUserIsAuthenticated = validateUserIsAuthenticated
exports.validateUserToken = validateUserToken
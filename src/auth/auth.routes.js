const router = require('express').Router()
const userServices = require('../users/users.http')
const authServices = require('./auth.http') 


router.route('/login')
    .post(authServices.login)

router.route('/register')
    .post(userServices.register)


module.exports = {
    router
}
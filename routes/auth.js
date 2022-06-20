const express = require('express')
//const User = require('../config/passport')
const router = express.Router()
const passport = require('passport')

//authentication via google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

//callback
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/tasks')
    }
)

//Logout User
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router
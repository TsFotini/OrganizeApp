const express = require('express')
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const router = express.Router()
const Task = require('../models/Task')

//login get request
router.get('/', ensureGuest, (req, res) => {
    res.render('login',
        { layout: 'login' }
    )
})


router.get('/tasks', ensureAuth, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id, completion: false, isvalid: true }).lean()
        res.render('tasks', {
            name: String(req.user.image),
            fullname: req.user.firstName,
            tasks
        }

        )

    } catch (err) {
        console.log(err)
        res.render('/errors/500')
    }
})
module.exports = router
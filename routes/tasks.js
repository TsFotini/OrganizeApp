const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const Task = require('../models/Task')

//ADD TASKS
//go to view wthat adds a new task
router.get('/addtask', ensureAuth, async (req, res) => {
    res.render('tasks/addtask',
        {
            name: String(req.user.image)
        }
    )
});

//insert a new task
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id
        await Task.create(req.body)
        res.redirect('/tasks')
    }
    catch (err) {
        res.render('/error/500')
    }
});

//EDIT TASKS
router.get('/edittask', ensureAuth, async (req, res) => {

    findobj = { _id: req.query.id }
    var task = await Task.findOne(findobj).lean()
    res.render('tasks/edittask',
        {
            name: String(req.user.image),
            task

        }
    )
});

router.put('/edit/:id', ensureAuth, async (req, res) => {
    try {
        let task = await Task.findById(req.params.id).lean()

        if (!task) {
            return res.render('error/404')
        }

        story = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
        })


        res.redirect('/tasks')
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})



//DONE TASKS
//go to view that tasks are set to done
router.get('/done', ensureAuth, async (req, res) => {
    const dones = await Task.find({ user: req.user.id, completion: true, isvalid: true }).lean()
    res.render('done',
        {
            name: String(req.user.image),
            fullname: req.user.firstName,
            dones
        }
    )
});

router.post('/makedone', ensureAuth, async (req, res) => {
    try {
        _taskid = req.body.taskid
        filter = { _id: _taskid }
        update = { completion: true }
        let doc = await Task.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true
        });
        res.send("Done")
    }
    catch (err) {
        console.log(err)
    }
});


//DELETE TASKS
//when presing the delete button for all tasks 
router.post('/deleteone', ensureAuth, async (req, res) => {
    try {
        _taskid = req.body.taskid
        console.log(_taskid)
        filter = { _id: _taskid }
        update = { isvalid: false }
        let doc = await Task.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true
        });
        res.send("Delete")
    }
    catch (err) {
        console.log(err)
    }
});

//Deletes the selected task
router.post('/deleteall', ensureAuth, async (req, res) => {
    try {
        filter = { user: req.user.id, completion: true }
        update = { $set: { isvalid: false } }
        let options = { multi: true };
        tsks = await Task.updateMany(filter, update, options)
        res.redirect('/tasks')
    }
    catch (err) {
        console.log(err)
    }
});


//Show Statistics
router.get('/statistics', ensureAuth, async (req, res) => {
    const alltasks = await Task.find({ user: req.user.id }).lean()
    const alltasksStr = JSON.stringify(alltasks);
    res.render('statistics',
        {
            name: String(req.user.image),
            fullname: req.user.firstName,
            alltasksStr
        }
    )
});



//in case user types an url that does not exist
router.get('*', async function (req, res) {
    res.status(404).send('Does not exist!');
});

router.put('*', async function (req, res) {
    res.status(404).send('Does not exist!');
});

module.exports = router
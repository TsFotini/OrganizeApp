//What we are using
const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
var path = require('path')
var method = require('method-override');

dotenv.config({ path: './config/config.env' })
require('./config/passport')(passport)

//connection with DB
connectDB()

//Initialize app
const PORT = process.env.PORT
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV}`)
)

app.use(
    method(function (req, res) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // look in urlencoded POST bodies and delete it
            let method = req.body._method
            delete req.body._method
            return method
        }
    })
)

app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URI, }),
    })
)

//Handlebars
const { formatDate } = require('./helpers/hbs')
var handlebars = require('express-handlebars').create({
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partial"),
    helpers: {
        formatDate
    },
    defaultLayout: 'main',
    extname: 'hbs'
});


app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "views"));


//passport
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static('public'))
//Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/tasks', require('./routes/tasks'))






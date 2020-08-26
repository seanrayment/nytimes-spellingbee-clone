require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(morgan('dev'));
app.set('view engine', 'pug');
app.use(cookieParser())
app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'development',
  saveUninitialized: false,
  resave: false
}));
app.use(cors());
app.use(express.json());
app.use(express.static('public'))
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success')
  res.locals.error_messages = req.flash('error')
  next()
})

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));



const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter);

const gameRouter = require('./routes/game');
app.use('/game', gameRouter);

app.get('/admin', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
});

app.get('/login', function (req, res) {
    res.render('login', {});
})

app.get('/register', function (req, res) {
  res.render('register', {});
})

app.use(function (req, res, next) {
  res.status(404).send("Hmm this page does not exist");
})

app.listen(3000, () => console.log('server started'));

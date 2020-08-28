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
const User = require('./models/user')
const _ = require('lodash')

const app = express();
app.use(morgan('dev'));
app.set('view engine', 'pug');
app.use(cookieParser())
app.use(session({
  cookie: {
    maxAge: 60000
  },
  secret: 'development',
  saveUninitialized: false,
  resave: false
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/static', express.static('public'))
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy({
  usernameField: 'email'
}, User.authenticate()));

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

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

app.get('/admin', function (req, res) {

  if (_.get(req, 'session.passport.user')) {
    console.log(req.session.passport.user);
    return res.render('index', {
      user: req.session.passport.user
    });
  }

  if (req.user) {
    console.log(req.user)
    return res.render('index', {
      user: req.user.email,
    })
  }
  req.flash('error', 'Please log in to access authorized content.')
  res.redirect('/users/login');
});

app.use(function (req, res, next) {
  res.status(404).send("Hmm this page does not exist");
})

app.listen(3000, () => console.log('server started'));
require('dotenv').config();
const express = require('express')
const cors = require('cors')
const app = express()
app.set('view engine', 'pug')
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));
app.use(cors());
app.use(express.json());
app.use(express.static('public'))

const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter);

const gameRouter = require('./routes/game');
app.use('/game', gameRouter);

app.get('/admin', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
  })

app.listen(3000, () => console.log('server started'));

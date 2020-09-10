const {
    buildGame
} = require('./services/game-factory');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

async function run() {
    const game = await buildGame();
    console.log(game)
    mongoose.connection.close()
}
run();
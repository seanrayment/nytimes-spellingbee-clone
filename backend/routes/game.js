const express = require('express');
const router = express.Router();
const Game = require('../models/game');

// get a game by id
router.get('/:id', async (req, res) => {
    try {
        console.log('received a request for a game')
        game = await Game.findById(req.params.id);
        if (game == null) {
            return res.status(404).json({
                message: 'The requested game doesn\'t exist'
            });
        }
        res.json(game);
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
});

module.exports = router;
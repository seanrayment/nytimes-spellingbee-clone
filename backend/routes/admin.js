const express = require('express');
const router = express.Router();
const passport = require('passport')
const User = require('../models/user');
const Game = require('../models/game');

router.route('/')
	.get(async (req, res) => {
		if (!req.isAuthenticated()) {
			res.redirect('/users/login');
		}

		const games = await Game.find();
		console.log(games)
		res.render('games', { user: req.user.email, games: games });
	});

router.route('/:id')
	.get(async (req, res) => {
		if (!req.isAuthenticated()) {
			res.redirect('/users/login');
		}
		console.log('redirected to an individual game')
		const game = await Game.findById(req.params.id);
		console.log(game)
		res.render('game', { user: req.user.email, game: game });
	})

module.exports = router
const express = require('express');
const router = express.Router()
const Joi = require('joi')
const passport = require('passport')
const User = require('../models/user')

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
    confirmationPassword: Joi.ref('password')
});

/*
auth API for use in a single page application
*/
router.route('/api/register')
    .post(async (req, res, next) => {

        // email validation and passwords match
        const result = userSchema.validate(req.body);

        // catch duplicate email explicitly
        const user = await User.findOne({
            'email': result.value.email
        });
        if (user) {
            req.flash('error', 'Email is already in use.')
            res.redirect('/users/register')
        }

        const newUser = await new User(result.value);
        try {
            await User.register(newUser, result.value.password);
        } catch (err) {
            next(err);
        }

        // explicitly call passport authenticate middleware
        // remember that middleware is just a function that
        // takes a req, res, and function to call next. Calling
        // authenticate returns the middleware function, which
        // we are in turn calling and propogating the req and res
        // from the original POST above
        passport.authenticate('local')(req, res, function() {
            res.json(newUser);
        });
    });

router.route('/api/login')
    // get the user stored with the cookie
    .get((req, res) => {
        console.log("attemping to get logged in user");
        res.json(req.user);
    })
    // login request
    .post(passport.authenticate('local'), (req, res) => {
        console.log(req);
        res.json(req.user);
    })

/*
auth endpoints that return HTML with user context
*/
router.route('/register')
    .get((req, res) => {
        res.render('register')
    })
    .post(async (req, res, next) => {
        try {
            console.log(req.body);
            const result = userSchema.validate(req.body)
            if (result.error) {
                req.flash('error', 'Data entered is not valid. Please try again.')
                res.redirect('/users/register')
                return
            }

            const user = await User.findOne({
                'email': result.value.email
            });
            if (user) {
                req.flash('error', 'Email is already in use.')
                res.redirect('/users/register')
                return
            }
            console.log(result.value);
            const newUser = await new User(result.value);
            await User.register(newUser, result.value.password);

            passport.authenticate('local')(req, res, function () {
                res.redirect('/admin');
            });

        } catch (error) {
            next(error)
        }
    })

router.route('/login')
    .get((req, res) => {
        res.render('login')
    })
    .post(passport.authenticate('local'), (req, res) => {
        res.redirect('/admin');
    });

module.exports = router
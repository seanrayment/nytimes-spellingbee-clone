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
const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secretKey = require('../../config/keys').secretOrKey
const passport = require('passport')

// Load validator
const validRagisterInput = require('../../validator/register')
const validLoginInput = require('../../validator/login')

// Load user model
const User = require('../../models/User')

// @route   GET api/users/signup
// @desc    Register a user
// @access  Public
router.post('/signup', (req, res) => {

    const {errors, isValid } = validRagisterInput(req.body)
    // Check Validation
    console.log(errors)
    if(!isValid){
        return res.status(400).json({errors: errors})
    }

    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    message: 'Email already exists'
                })
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', // Size
                    r: 'pg', // Rating
                    d: 'mm' // Default
                })

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;

                        newUser.password = hash
                        newUser.save()
                            .then(user => res.status(200).json(user))
                            .catch(err => console.log(err))
                    })
                })
            }
        })
        .catch(err => console.log(err))
})

// @route   GET api/user/login
// @desc    Login a user
// @access  Public
router.post('/login', (req, res) => {
   
    const {errors, isValid } = validLoginInput(req.body)
    console.log(req.body)
    // Check Validation
    if(!isValid){
        return res.status(400).json({errors: errors})
    }

    const email = req.body.email
    const password = req.body.password

    // Find user in DB by email
    User.findOne({
            email
        })
        .then(user => {
            if (!user){
            errors.email = 'User not found'
            console.log(errors)
                return res.status(404).json({
                   errors
                })}

            // check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {

                        const payload = {id: user.id, name: user.name, avatar: user.avatar} // create JWT payload

                        jwt.sign(payload, secretKey, {expiresIn: 3600}, (err, token) => {
                            if(err)
                                throw err

                            res.status(200).json({
                                success: true,
                                token: 'Bearer '+token
                            })
                           
                        })
                    } else{
                        errors.password = 'Password incorrect'
                        return res.status(400).json({
                            errors
                        })
                    }
                })
        })
})

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);
module.exports = router
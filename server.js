const express = require('express')
const mongoose = require('mongoose')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')
const bodyParser = require('body-parser')
const passport = require('passport')


const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// DB config
const db = require('./config/keys').mongoURL
console.log(db)
// Connect to MongoDB
mongoose.connect(db)
    .then(() => {
        console.log('MongoDB connected')
    })
    .catch(err => console.log(err))

// passport middleware
app.use(passport.initialize())

// password config
require('./config/passport')(passport)

app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server is listening on ${port} since ${new Date()}`)
})

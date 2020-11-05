const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const cors = require('cors')
const signin = require('./controllers/signin')
const register = require('./controllers/register')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'l1u6p0u794',
        database: '\'smart-brain\''
    }
})

const app = express()
app.use(bodyParser.json())
app.use(cors())


app.post('/signin',  signin.handleSignin(bcrypt,knex))

app.post('/register',  register.handleRegister(bcrypt,knex,))

app.get('/profile/:id',  profile.handleProfile(knex))

app.put('/image',  image.handleImage(knex))
app.post('/imageUrl',  image.handleApiCall)


app.listen(3001, () => {
    console.log('server is listening on port 3001')
})

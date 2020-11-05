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
        host: ' postgresql-trapezoidal-90119',
        user: 'postgres',
        password: '',
        database: 'smart-brain'
    }
})

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/',(req,res) => res.json('HI there'))
app.post('/signin',  signin.handleSignin(bcrypt,knex))

app.post('/register',  register.handleRegister(bcrypt,knex,))

app.get('/profile/:id',  profile.handleProfile(knex))

app.put('/image',  image.handleImage(knex))
app.post('/imageUrl',  image.handleApiCall)

const PORT = process.env.PORT || 3005
app.listen(PORT, () => {
    console.log('server is listening on port' + PORT)
})

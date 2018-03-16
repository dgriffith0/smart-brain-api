const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const image = require('./controllers/image')
const profile = require('./controllers/profile')
var knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true,
    }
  });

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=> {
    res.send('Server is running.');
})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.post('/signin', signin.handleSignin(db, bcrypt))

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`app is running on ${process.env.PORT}`);
});
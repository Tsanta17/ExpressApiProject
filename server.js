/****************** */
/** iport des modules nécessaires */
const express = require('express');
const cors = require('cors'); 
const checkTokenMidlleware = require('./jsonwebtoken/check')

/****************** */
/*** Import de la connexion à la DB */
let DB = require('./db.config')

/****************** */
/*** Initialisation de l'API */
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}))

/**************************** */
/*** import des modules routage */
const user_router = require('./routes/users')
const cocktail_router = require('./routes/cocktail')
const auth_router = require('./routes/auth')

/****************** */
/*** Mise en place du routage */
app.get('/', (req, res) => res.send(`I'm on line. Welldone!`))

app.use('/users', checkTokenMidlleware, user_router)
app.use('/cocktails', cocktail_router)
app.use('/auth', auth_router)

app.get('*', (req, res) => res.status(501).send('What the hell are you doing !?'))

/**************************** */
/*** server start avec test DB*/

DB.authenticate()
    .then(() => console.log('Database connection OK'))
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
    console.log(`This server is running on port ${process.env.SERVER_PORT}. OK !`)
        })
    })
    .catch(err => console.log('Database error', err))


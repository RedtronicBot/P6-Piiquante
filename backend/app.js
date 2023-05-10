const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')
require('dotenv').config()
const app = express()

/*Ajout de header pour le cross-origin*/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
/*Reglage du CORS*/
app.options("*",cors());

/*Récupération des routes*/
const saucesRoutes = require('./routes/saucesRoutes')
const authRoutes = require('./routes/authRoutes')
/*Connexion à la base de données mongodb*/
mongoose.connect(process.env.MONGODB,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json())
/*Acces au fichier statiques*/
app.use(express.static(__dirname))
/*Utilisation des routes*/
app.use('/api/auth',authRoutes)
app.use('/api/sauces',saucesRoutes)
module.exports = app
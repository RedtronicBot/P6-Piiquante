const express = require('express')
const mongoose = require('mongoose')
const app = express()

/*Ajout de header pour le cross-origin*/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

/*Récupération des routes*/
const saucesRoutes = require('./routes/saucesRoutes')
const authRoutes = require('./routes/authRoutes')
/*Connexion à la base de données mongodb*/
mongoose.connect('mongodb+srv://Redtronic:DuRanDal778@occluster.gcilpcq.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json());

/*Utilisation des routes*/
app.use('api/auth',authRoutes)
app.use('api/sauces',saucesRoutes)
module.exports = app
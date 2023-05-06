const user = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/*Module pour la création d'un compte*/
exports.signup = (req,res,next)=>{
    console.log(req.body.email)
    console.log(req.body.password)
    bcrypt.hash(req.body.password,10)
    .then(hash =>{
        const user = new user({
            email: req.body.email,
            password: hash
        })
        user.save()
        .then(()=> res.status(201).json({message: 'Utilisateur crée'}))
        .catch(error => res.status(400).json({error}))
    })
    .catch(error => res.status(500).json({error}))
}

/*Module pour la connexion de l'utilisateur*/
exports.login = (req,res,next)=>{
    user.findOne({email:req.body.email})
    .then(user =>{
        if(user === null)
        {
            res.status(401).json({message:'Identifiant ou mot de passe incorrect'})
        }
        else
        {
            bcrypt.compare(req.body.password,user.password)
            .then(valid =>{
                if(!valid)
                {
                    res.status(401).json({message:'Identifiant ou mot de passe incorrect'})
                }
                else
                {
                    res.status(200).json({
                        userId: user._id,
                        token:jwt.sign(
                          {userId: user._id},
                          'TOKEN_SECRET',
                          {expiresIn:'24h'}  
                        )
                    })
                }
            })
            .catch(error => res.status(500).json({error}))
        }
    })
    .catch(error => res.status(500).json({error}))
}
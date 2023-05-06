/*Récupération du model de sauces*/
const Sauces = require('../models/sauces')
/*récupération de toutes les sauces*/
exports.getAllSauces = (req,res,next)=>{
     Sauces.find()
     .then(sauces => res.status(200).json(sauces))
     .catch(error => res.status(400).json({error}))
}
/*Récupération d'une seule sauce*/
exports.getOneSauce = (req,res,next)=>{
    Sauces.findOne({_id:req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({error}))
}
/*Création d'une sauces*/
exports.createSauce = (req,res,next)=>{
    const sauceObject = JSON.parse(req.body.sauces)
    delete sauceObject._id
    delete sauceObject._userid
    const sauces = new Sauce({
        ...sauceObject,
        userId:req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    sauces.save()
    .then(()=> {res.status(201).json({message:'Sauce enregistré'})})
    .catch(error => res.status(400).json({error}))
}
/*Modification d'une sauce*/
exports.modifySauce = (req,res,next)=>{
    Sauces.updateOne({_id:req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({error}))
}
/*Suppression d'une sauce*/
exports.deleteSauce = (req,res,next)=>{
    Sauces.deleteOne({_id:req.params.id})
    .then(sauce=> res.status(200).json(sauce))
    .catch(error=> res.status(400).json({error}))
}
/*Ajout d'un like*/

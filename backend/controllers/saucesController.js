/*Récupération du model de sauces*/
const fs = require('fs')
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
    const sauceObject = JSON.parse(req.body.sauce)
    const sauces = new Sauces({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    })
    sauces.save()
    .then(()=> {res.status(201).json({message:'Sauce enregistré'})})
    .catch(error => res.status(400).json({error}))
}

/*Modification d'une sauce*/
exports.modifySauce = (req,res,next)=>{
    /*Verifiation si on ajoute une nouvelle image*/
    if(req.file)
    {
        Sauces.findOne({_id:req.params.id})
        .then(sauce =>{ 
            var url = sauce.imageUrl
            var decoupageChemin = `.${url.substring(url.indexOf("/", url.indexOf("//") + 2))}`
            fs.unlink(decoupageChemin, (err => {console.log(err)}))
            }
        )
        .catch(error => res.status(400).json({error}))
    }
    const sauceObject = req.file
    ? 
    {...JSON.parse(req.body.sauce),imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`}
    : 
    { ...req.body }
    Sauces.updateOne({ _id: req.params.id },{...sauceObject, _id:req.params.id})
    .then(() => res.status(200).json({message:'Sauce modifié'}))
    .catch(error => res.status(400).json({error}))
}

/*Suppression d'une sauce*/
exports.deleteSauce = (req,res,next)=>{
    Sauces.findOne({_id:req.params.id})
    .then(sauce =>{ 
        var url = sauce.imageUrl
        var decoupageChemin = `.${url.substring(url.indexOf("/", url.indexOf("//") + 2))}`
        fs.unlink(decoupageChemin, (err => {console.log(err)}))
        }
    )
    .catch(error => res.status(400).json({error}))
    Sauces.deleteOne({_id:req.params.id})
    .then(() => res.status(200).json({message:'Sauce supprimé'}))
    .catch(error=> res.status(400).json({error}))
}

/*Ajout d'un like/Dislike*/
exports.addLike = (req,res,next)=>{
    const like = req.body.like
    if(like == 1)
    {
        const sauceObject =
        {
            $inc: { likes: 1 },
            $push : {usersLiked : req.body.userId}
        }
        Sauces.updateOne({ _id: req.params.id },{...sauceObject, _id:req.params.id})
        .then(() => res.status(200).json({message:'Like ajouté'}))
        .catch(error => res.status(400).json({error}))
    }
    else if(like == -1)
    {
        const sauceObject =
        {
            $inc: { dislikes: 1 },
            $push : {usersDisliked : req.body.userId}
        }
        Sauces.updateOne({ _id: req.params.id },{...sauceObject, _id:req.params.id})
        .then(() => res.status(200).json({message:'Dislike ajouté'}))
        .catch(error => res.status(400).json({error}))
    }
    else
    {
        Sauces.findOne({_id:req.params.id})
        .then(sauce => {
            if(sauce.usersLiked.includes(req.body.userId))
            {
                const sauceObject =
                {
                    $inc: { likes: -1 },
                    $pull : {usersLiked : req.body.userId}
                }
                Sauces.updateOne({ _id: req.params.id },{...sauceObject, _id:req.params.id})
                .then(() => res.status(200).json({message:'Like retiré'}))
                .catch(error => res.status(400).json({error}))
            }
            else
            {
                const sauceObject =
                {
                    $inc: { dislikes: -1 },
                    $pull : {usersDisliked : req.body.userId}
                }
                Sauces.updateOne({ _id: req.params.id },{...sauceObject, _id:req.params.id})
                .then(() => res.status(200).json({message:'Dislike retiré'}))
                .catch(error => res.status(400).json({error}))
            }
        })
        .catch(error => res.status(400).json({error}))
    }
}
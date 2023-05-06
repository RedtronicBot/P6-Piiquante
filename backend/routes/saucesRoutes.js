const express = require('express')
const router = express.Router()
const saucesController = require('../controllers/saucesController')
/*Récupération des middleware pour l'authentification et l'ajout d'image*/
const auth = require('../middleware/auth')
const multer = require('../middleware/multer')

/*Routes pour les sauces*/
router.get('/',auth,saucesController.getAllSauces)
router.get('/:id',auth,saucesController.getOneSauce)
router.post('/',auth,multer,saucesController.createSauce)
router.put('/:id',auth,saucesController.modifySauce)
router.delete('/:id',auth,saucesController.deleteSauce)
router.post('/:id/like',auth)
module.exports = router
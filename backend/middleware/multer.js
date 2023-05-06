const multer = require('multer')

/*Objet pour déterminer l'extension de l'image*/
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
}

/*Configuration de multer*/
const storage = multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null,'images')
    },
    filename:(req,file,callback)=>{
        /*Modification du nom pour remplacer les espaces par des underscore*/
        const name = file.originalname.split(' ').join('_')
        const extension = MIME_TYPES[file.mimetype]
        callback(null,name + Date.now()+ '.' + extension)
    }
})

module.exports = multer({storage:storage}).single('image')
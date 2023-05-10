const multer = require('multer')

/*Configuration de multer*/
const storage = multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null,'images')
    },
    filename:(req,file,callback)=>{
        /*Modification du nom pour remplacer les espaces par des underscore*/
        const name = file.originalname.split(' ').join('_')
        console.log(name)
        callback(null,Date.now()+ name)
    }
})

module.exports = multer({storage:storage}).single('image')
const router = require('express').Router()
const Image =  require('../controllers/Controllers')

/* GET Images listing. */
router.get('/',  Image.getAllImages);
router.post('/', Image.createImage);
router.delete('/:id', Image.deleteImage);
router.put('/:id',  Image.updateImage);

module.exports = router

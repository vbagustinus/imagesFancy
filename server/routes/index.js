const router = require('express').Router()
const Image =  require('../controllers/Controllers')
const images = require('../helpers/images')
const upload = images.multer.single('image');
/* GET Images listing. */
router.get('/',  Image.getAllImages);
router.post('/upload', (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      return res.status(400).json({
        error: 'err'
      });
    }
    next();
  });
}, images.sendUploadToGCS, (req, res, next) => {
  Image.createImage(req, res, next)
});
router.delete('/:id', Image.deleteImage);
router.put('/:id',  Image.updateImage);

module.exports = router

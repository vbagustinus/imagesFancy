const mongoose = require('mongoose').connect('mongodb://vbagustinus:anakjalanan@smartshop-shard-00-00-hibsb.mongodb.net:27017,smartshop-shard-00-01-hibsb.mongodb.net:27017,smartshop-shard-00-02-hibsb.mongodb.net:27017/images?ssl=true&replicaSet=smartshop-shard-0&authSource=admin');
// const mongoose = require('mongoose').connect('mongodb://localhost:27017/images');
const ObjectId = require('mongodb').ObjectID;
const Images = require('../models/Model');

let getAllImages = (req, res) => {
  Images.find()
  .then(dataImages => {
    console.log(dataImages);
    res.send(dataImages)
  })
  .catch( err => {
    console.log(err);
  })
}

let createImage = (req, res, next) => {
  // console.log(req.body.name);
  // console.log('LOKASI',req.body.longitude);
  // console.log('LOKASI',req.body.latitude);
  // console.log('URL PENTING',req.file.cloudStoragePublicUrl);
  let inputObj = Images({
    name: req.body.name,
    url: req.file.cloudStoragePublicUrl,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
  })
   inputObj.save()
   .then( data => {
     res.send({
       msg: 'Data Tersimpan',
       data: data
     })
   })
   .catch( err=> {
     console.log(err);
   })
}


let deleteImage = (req, res) => {
  // console.log("ID",req.params.id);
  let id = {
    _id : ObjectId(req.params.id)
  }
  Images.findByIdAndRemove(id)
  .then(imagesRemove => {
    res.send({
      image: imagesRemove,
      messages: 'Remove successed'
    })
  })
  .catch(err=>{
    res.status(500).send(err)
  })
}

let updateImage = (req, res) => {

}

module.exports = {
  createImage,
  getAllImages,
  deleteImage,
  updateImage
}

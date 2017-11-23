// const mongoose = require('mongoose').connect('mongodb://vbagustinus:anakjalanan@smartshop-shard-00-00-hibsb.mongodb.net:27017,smartshop-shard-00-01-hibsb.mongodb.net:27017,smartshop-shard-00-02-hibsb.mongodb.net:27017/images?ssl=true&replicaSet=smartshop-shard-0&authSource=admin');
const mongoose = require('mongoose').connect('mongodb://localhost:27017/images');
const ObjectId = require('mongodb').ObjectID;
const Images = require('../models/Model');

let getAllImages = (req, res) => {

}

let createImage = (req, res, next) => {
  console.log(req.body.name);
  console.log('LOKASI',req.body.longitude);
  console.log('LOKASI',req.body.latitude);
  console.log('URL PENTING',req.file.cloudStoragePublicUrl);
  // let inputObj = {
  //   name: req.body.name,
  //   url: req.file.cloudStoragePublicUrl,
  //   location: String,
  //   createdAt: {
  //     type: Date,
  //     default: Date.now
  //   }
  // }
}


let deleteImage = (req, res) => {

}

let updateImage = (req, res) => {

}

module.exports = {
  createImage,
  getAllImages,
  deleteImage,
  updateImage
}

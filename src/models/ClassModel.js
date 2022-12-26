const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const ClassSchama = new Schema({   
  class: String,
  studentsCount : Number  ,
  id:Number
  })
  const UserModel = mongoose.model('class', ClassSchama ); // NOT COMPLITED 
  module.exports = UserModel;

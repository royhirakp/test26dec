const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const studentSchma  = new Schema({   
    name: String, 
    classId : Number,
    studentId : Number
  })
  const UserModel = mongoose.model('Student', studentSchma ); // NOT COMPLITED 
  module.exports = UserModel;
const express = require('express')
const mongoose = require('mongoose');
const app = express()
require('dotenv/config');

const ClassModel = require('./src/models/ClassModel')
const StudentModel = require('./src/models/StudentModel')
//connection to database 
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('database Connected!'))
  .catch((e) => console.log('Error!!! to connect the database' + e.message))
// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded())
console.log((new Date()).getTime())


// create a class 1
app.post('/v1/myClass', async (req, res) => {
  try {
    const allclassArr = await ClassModel.find()
    const id = (new Date()).getTime()
    const Class = await ClassModel.create({
      class: req.body.class,
      studentsCount: req.body.studentsCount,
      id: id
    })
    res.status(201).json({ id })

  } catch (error) {
    res.json({
      error
    })
  }
})

//2 not understarnd the status
// /v1/myClass/:myClassId/students
app.post('/v1/myClass/:myClassId/students', async (req, res) => {
  try {
    console.log(req.params.myClassId)

    const S_id = (new Date()).getTime()
    const Class = await StudentModel.create({
      name: req.body.name,
      classId: req.params.myClassId,
      studentId: S_id
    })
    res.status(201).json({ studentId: S_id })
  } catch (error) {
    res.json({
      error
    })
  }
})



// /v1/myClass
//3 get the classer
app.get('/v1/myClass', async (req, res) => {
try{
  const classes = await ClassModel.find()
  res.status(201).json({ classes: classes })
}catch{
  res.json({
    error
  })
}
})

/// find class by id  4
app.get('/v1/myClass/:myClassId', async (req, res) => {
 try {
  let clasname = await ClassModel.find({ id: req.params.myClassId })
  // console.log('no 44444')

  if (clasname) {
    res.json({ clasname })
  } else {
    res.status(404).json({
      error: "There is no class at that id"
    })
  }
 } catch (error) {
  res.json({
    error
  })
  
 }
})

//Test Case 5 - Get all students in a specific class


app.get('/v1/myClass/:myClassId/students', async (req, res) => {
  try {
    let clasname = await StudentModel.find({ classId: req.params.myClassId })

  if (clasname) {
    res.json({ clasname })
  } else {
    res.status(404).json({
      error: "There is no class at that id"
    })
  }
  } catch (error) {
    res.json({
      error
    })
    
  }
})



//get one studentd edetails
app.get('/v1/myClass/:myClassId/students/:studentId', async (req, res) => {

try {
  let calssid = req.params.myClassId;
  let stdID = req.params.studentId;
  let studentDetails = await StudentModel.find({ $and: [{ classId: req.params.myClassId }, { studentId: stdID }] })

  if (studentDetails) {
    res.json({ studentDetails })
  } else {
    res.status(404).json({
      error: "There is no student of that id"
    })
  }
  
} catch (error) {
  res.json({
    error
  })
  
}
})


//
// PUT
//cant get the question 
app.put('/v1/myClass/:myClassId/students/:studentId', async (req, res) => {
  try {
    // const student = await StudentModel.updateOne({classId:})
    // const 
    const sutdentUpdate = await StudentModel.updateOne({ $and: [{ classId: req.params.myClassId }, { studentId: req.params.studentId }] }, {$set:{name:""}})
  res.status(204).json({
    status:"deleted"
  })
    
  } catch (error) {
    res.json({error})
  }
  
})

//DELETE
app.delete('/v1/myClass/:myClassId', async (req, res) => {
  try {
    let calss = await ClassModel.find({ id: req.params.myClassId })
    if (!calss) {
      res.status(404).json({
        error: "There is no task at that id"
      })
    }
    await ClassModel.deleteOne({ id: req.params.myClassId })
    res.status(204)
  } catch (error) {
    res.json({
      error: error
    })
  }
})

//delete student 
app.delete('/v1/myClass/:myClassId/students/:studentId', async (req, res) => {
  try {
    let studentDetails = await StudentModel.find({ $and: [{ classId: req.params.myClassId }, { studentId: stdID }] })

    if (!studentDetails) {
      res.status(404).json({
        error: "There is no task at that id"
      })
    }
    await StudentModel.deleteOne({ $and: [{ classId: req.params.myClassId }, { studentId: stdID }] })
    res.status(204)
  } catch (error) {
    res.json({
      error: error
    })
  }
})


//BAD REQUEST
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'Failed',
    message: '404! not found'
  })
})


app.listen(4000, () => console.log('server start at port 4000....'))

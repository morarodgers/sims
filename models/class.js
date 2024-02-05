const mongoose = require('mongoose')

//student's class Schema
const ClasssSchema = new mongoose.Schema({
name:{
    type : String,
    required: [true, 'Please enter the name of class'],
    minlength: 3
},
teacher:{
    type : String,
    required: [true, 'Please enter the name of class teacher'],
    minlength: 3,
    maxlegth: 50,
},
numStudents:{
    type : Number,
    //required: [true, 'Please enter the number of students']
},
attendance:{
    date:{type:Date, required:true},
    studentsAttended:{type:Array, default:[]},
}
})

module.exports = mongoose.model('Classs', ClasssSchema)
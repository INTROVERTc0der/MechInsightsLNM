import mongoose, { Mongoose } from 'mongoose';

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: [true, 'Course Name is required']
    },
    stRollNo: [String],
    batch: {
        type: String
    },
    semester:{
        type: Number
    }
})
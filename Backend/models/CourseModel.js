import mongoose, { Mongoose } from 'mongoose';

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: [true, 'Course Name is required']
    },
    rollNo: [String],
    batch: {
        type: String
    },
    semester:{
        type: Number
    }
});


const Course=mongoose.model('Course', courseSchema);

export default Course;
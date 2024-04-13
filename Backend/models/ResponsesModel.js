import mongoose from 'mongoose';

const Y20DataSchema = new mongoose.Schema({
  facultyId: {
    type: String,
    required: true,
    ref: 'User_Faculty',
  },
  formId: {
    type: String,
    required: true,
    ref: 'Form',
  },
  studentId: {
    type: String,
    required: true,
    ref: 'User_Student',
  },
  answers: [
    {
      type: Number,
      required: true,
    },
  ],
});

const Y20=mongoose.model('Y20Data', Y20DataSchema);
export default Y20;
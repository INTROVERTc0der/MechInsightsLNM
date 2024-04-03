import mongoose from 'mongoose';

const Y22DataSchema = new mongoose.Schema({
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

const Y22=mongoose.model('Y22Data', Y22DataSchema);
export default Y22;
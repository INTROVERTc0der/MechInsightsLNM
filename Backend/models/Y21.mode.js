import mongoose from 'mongoose';

const Y21DataSchema = new mongoose.Schema({
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

const Y21=mongoose.model('Y21Data', Y21DataSchema);
export default Y21;
import mongoose from 'mongoose';

const responsesSchema = new mongoose.Schema({
  facultyId: {
    type: String,
    required: true,
    ref: 'User_Faculty',
  },
  form_name: { //form Id
    type: String,
    required: true,
    ref: 'Form',
  },
  sRollNo: {
    type: String,
    required: true,
    ref: 'User_Student',
  },
  batch: {
    type: String
  },

  answers: [Number],
});

const responses =mongoose.model('Y20Data', responsesSchema);
export default responses;
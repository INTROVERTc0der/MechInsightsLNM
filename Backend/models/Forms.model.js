import mongoose from 'mongoose';

const FormSchema = new mongoose.Schema({
  f_type:{
    type: String
  },
   f_name: {
    type: String,
    required: true,
  },
  batch:{
    type: String,
    required: [true,"please entere the batch"]
  },
  faculty_id: {
    type: mongoose.Schema.ObjectId,
    required: [true,"facultyid is req"]
  },
  responses: [
    {
      q1: Number,
      q2: Number,
      q3: Number,
      q4: Number,
      q5: Number,
      q6: Number,
      q7: Number,
      q8: Number,
      q9: Number,
      q10: Number,
    }
  ]
});

const Forms=mongoose.model('Forms', FormSchema);
export default Forms;
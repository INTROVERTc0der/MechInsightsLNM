import mongoose from 'mongoose';

const responsesSchema = new mongoose.Schema({
  f_type: {
    type: String,
    required: true,
    ref: 'Form',
  },
  description: {
    type: String
  },
  batch: {
    type: String
  },
  course:
  {
    type: String
  },
  submittedBy:
  {
    type: [String]
  },

  answers: [[Number]],
});

const Responses = mongoose.model('Responses', responsesSchema);
export default Responses;
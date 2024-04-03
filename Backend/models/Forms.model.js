import mongoose from 'mongoose';

const FormSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  // questions: [
  //   {
  //     id: {
  //       type: String,
  //       required: true,
  //     },
  //     text: {
  //       type: String,
  //       required: true,
  //     },
  //     type: {
  //       type: String,
  //       required: true,
  //       enum: ['radio'],
  //     },
  //   },
  //],
  link: {
    type: String,
    required: true,
  },
});

const Forms=mongoose.model('Form', FormSchema);
export default Forms;
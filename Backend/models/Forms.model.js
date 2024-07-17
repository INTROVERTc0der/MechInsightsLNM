import mongoose from 'mongoose';

const FormSchema = new mongoose.Schema({
  f_type:{
    type: String
  },
  
  questions: [String]
});


const Forms=mongoose.model('Forms', FormSchema);

export default Forms;
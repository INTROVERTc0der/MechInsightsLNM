import mongoose from 'mongoose';

const UserStudentSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: [true, 'Roll Number is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'UserName is required'],
    unique: [true, 'UserName must be unique'],
    trim:true,
    minlength:[6,'UserName must be of minmum 6 characters']
  },
  password: {
    type: String,
    minlength:[8, 'Password must be at least 8 characters'],
    required: true,
    select:false,
  },
  name: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  InstituteEmail: {
    type: String,
    required: true,
    unique: true,
    lowercase:true,
    match:[],//matches email agaist regex
  },
  personalEmail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please fill in a valid email address',
      ],
  },
  branch: {
    type: String,
    required: true,
  },
  graduationYear: {
    type: Number,
    required: true,
  },
});

const Student=mongoose.model('User_Student', UserStudentSchema);
export default Student;
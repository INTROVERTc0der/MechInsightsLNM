
import mongoose from 'mongoose';

const UserFacultySchema = new mongoose.Schema({
  facultyId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: [true, 'UserName is required'],
    unique: [true, 'UserName must be unique'],
    trim:true,
    minlength:[6,'UserName must be of minmum 6 characters']
  },
  post: {
    type: String,
    enum:[],
    default:'',
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
  password: {
    type: String,
    minlength:[8, 'Password must be at least 8 characters'],
    required: true,
    select:false,
  },
  role: {
    type: String,
    required: true,
    enum: ['Faculty', 'Admin'],
    default: 'Faculty',
  },
});

const Faculty= mongoose.model('User_Faculty', UserFacultySchema);
export default Faculty ;
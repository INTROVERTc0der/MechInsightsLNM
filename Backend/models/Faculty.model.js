
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Forms from './Forms.model.js';
import jwt from 'jsonwebtoken';

const userFacultySchema = new mongoose.Schema({
  facultyId: {
    type: String,
    required: true,
   // unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: [true, 'UserName is required'],
    //unique: [true, 'UserName must be unique'],
    trim:true,
    minlength:[6,'UserName must be of minmum 6 characters']
  },
  post: {
    type: String,
    enum: ["assistant professor","professor"],
    default:'',
    required: true,
  },
  instituteEmail: {
    type: String,
    // required: true,
    //unique: true,
    lowercase:true,
   // match:[],//matches email agaist regex
  },
  personalEmail: {
    type: String,
    required: true,
    //unique: true,
    lowercase: true,
  },
  password:{
    type: String,
    minlength:[5, 'Password must be at least 5 characters'],
    required: true,
    select:false,
  },
  
  role: {
    type: String,
    required: true,
    enum: ['Faculty', 'Admin'],
    default: 'Faculty',
  },
  form_issued: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Forms'  //reference to another model
      //faculty_mongoId: mongoose.Schema.ObjectId,
    }
  ],
});

// Hashes password before saving to the database
userFacultySchema.pre('save', async function (next) {
  // If password is not modified then do not hash it
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
});

userFacultySchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Faculty= mongoose.model('User_Faculty', userFacultySchema);
export default Faculty ;
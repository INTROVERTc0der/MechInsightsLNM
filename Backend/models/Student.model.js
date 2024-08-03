import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Forms from './Forms.model.js';
import Responses from './ResponsesModel.js'
import jwt from 'jsonwebtoken';
//import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: [true, 'Roll Number is required'],
    unique: true,
  },
  password: {
    type: String,
    minlength: [8, 'Password must be at least 8 characters'],
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
    default:''
  },
  instituteEmail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    //match:[],//matches email agaist regex
  },
  personalEmail: {
    type: String,
    lowercase: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please fill in a valid email address',
    ],
  },
  form_links: [
    {

      type: mongoose.Schema.ObjectId,
      ref: 'Responses'  //reference to another model
      //faculty_mongoId: mongoose.Schema.ObjectId,

    }
  ],
  branch: {
    type: String,
    required: true,
    default: 'Mechanical'
  }
});

// Hashes password before saving to the database
userSchema.pre('save', async function (next) {
  // If password is not modified then do not hash it
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Student = mongoose.model('User_Student', userSchema);
export default Student;
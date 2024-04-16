import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Forms from './Forms.model.js';
import jwt from 'jsonwebtoken';
//import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: [true, 'Roll Number is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'UserName is required'],
    unique: [true, 'UserName must be unique'],
    trim: true,
    minlength: [6, 'UserName must be of minmum 6 characters']
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
    required: true,
    unique: true,
    lowercase: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please fill in a valid email address',
    ],
  },
  form_links: [
    {

      type: mongoose.Schema.ObjectId,
      ref: 'Forms'  //reference to another model
      //faculty_mongoId: mongoose.Schema.ObjectId,

    }
  ],
  branch: {
    type: String,
    required: true,
  },
  graduationYear: {
    type: Number,
    required: true,
  },
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

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userFacultySchema = new mongoose.Schema({
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
    enum: ["assistant professor","professor"],
    default:'',
    required: true,
  },
  instituteEmail: {
    type: String,
    required: true,
    //unique: true,
    lowercase:true,
   // match:[],//matches email agaist regex
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
  password:{
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

// Hashes password before saving to the database
userFacultySchema.pre('save', async function (next) {
  // If password is not modified then do not hash it
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
});
/* 
userFacultySchema.methods = {
  // method which will help us compare plain password with hashed password and returns true or false
  comparePassword: async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
  },

  // Will generate a JWT token with user id as payload
  generateJWTToken: async function () {
    return await jwt.sign(
      { id: this._id, role: this.role, instituteEmail: this.instituteEmail },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );
  }, */

  // This will generate a token for password reset
  // generatePasswordResetToken: async function () {
  //   // creating a random token using node's built-in crypto module
  //   const resetToken = crypto.randomBytes(20).toString('hex');

  //   // Again using crypto module to hash the generated resetToken with sha256 algorithm and storing it in database
  //   this.forgotPasswordToken = crypto
  //     .createHash('sha256')
  //     .update(resetToken)
  //     .digest('hex');

  //   // Adding forgot password expiry to 15 minutes
  //   this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000;

  //   return resetToken;
  // },


const Faculty= mongoose.model('User_Faculty', userFacultySchema);
export default Faculty ;
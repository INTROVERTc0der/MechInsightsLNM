import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import Faculty from '../models/Faculty.model.js';
import Student from '../models/Student.model.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import { promisify } from 'util';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;
  res.status(200).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

//LOGIN
const login = catchAsync(async (req, res, next) => {
  const { instituteEmail, password } = req.body;
  if (!instituteEmail || !password) return next(new AppError('Please enter all details', 400))
  // 1) Check if instituteEmail and password exist
  const student = await Student.findOne({ instituteEmail }).select('+password');
  const faculty = await Faculty.findOne({ instituteEmail }).select('+password');

  const user = faculty || student;

  // console.log(user);
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect instituteEmail or password', 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
  //res.status(200).json({status: 'log in success'})
});

//LOGOUT 
const logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'log out success' });

};

const changePassword = catchAsync(async (req, res, next) => {
  // Destructuring the necessary data from the req object
  const { oldPassword, newPassword } = req.body;
  const { id } = req.user; // because of the middleware isLoggedIn

  // Check if the values are there or not
  if (!oldPassword || !newPassword) {
    return next(
      new AppError('Old password and new password are required', 400)
    );
  }

  // Finding the user by ID and selecting the password
  const student = await Student.findById(id).select('+password');
  const faculty = await Faculty.findById(id).select('+password');
  const user = student || faculty;
  // If no user then throw an error message
  if (!user) {
    return next(new AppError('Invalid user id or user does not exist', 400));
  }

  // Check if the old password is correct
  const isPasswordValid = await user.correctPassword(oldPassword, user.password);

  // If the old password is not valid then throw an error message
  if (!isPasswordValid) {
    return next(new AppError('Invalid old password', 400));
  }

  // Setting the new password
  user.password = newPassword;

  // Save the data in DB
  await user.save();

  // Setting the password undefined so that it won't get sent in the response
  user.password = undefined;

  res.status(200).json({
    success: true,
    message: 'Password changed successfully',
  });
});


const forgetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  try {
    // Find user by email (assuming unique email across all users)
    const student = await Student.findOne({ instituteEmail: email }).select('+password');
    const faculty = await Faculty.findOne({ instituteEmail: email }).select('+password');
    const user = student || faculty;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log("User found")
    // Generate reset token
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    // Send email with reset link
    const resetLink = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
    console.log(process.env.EMAIL_USER)
    console.log(process.env.EMAIL_PASSWORD)
    console.log(resetToken)
    // Send email (you need to set up nodemailer with your email provider)
    const transporter = nodemailer.createTransport({
      // Configure your email provider here
      // Example configuration for Gmail
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Link',
      html: `You requested for a password reset. Click <a href="${resetLink}">here</a> to reset your password.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})


const resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.query;
  const { newPassword } = req.body;

  if (!token) {
    return next(new AppError('Token not provided', 400));
  }

  console.log('Token received:', token);


  // Verify the token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.error('Token verification error:', err);
    return next(new AppError('Token is invalid or has expired', 400));
  }

  // Find the user by ID from the token
  const student = await Student.findById(decoded.id).select('+password');
  const faculty = await Faculty.findById(decoded.id).select('+password');
  const user = student || faculty;

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  // Update the user's password
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password reset successfully',
  });
});

export { login, logout, changePassword, forgetPassword, resetPassword };
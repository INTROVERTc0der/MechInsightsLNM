import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import Faculty from '../models/Faculty.model.js';
import Student from '../models/Student.model.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import { promisify } from 'util';

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
    console.log('Received data:', { instituteEmail, password });
  
    if (!instituteEmail || !password) {
      return next(new AppError('Please enter all details', 400));
    }
  
    console.log('Checking for student with email:', instituteEmail);
  const student = await Student.findOne({ instituteEmail }).select('+password');
  console.log('Student found:', student);

  console.log('Checking for faculty with email:', instituteEmail);
  const faculty = await Faculty.findOne({ instituteEmail }).select('+password');
  console.log('Faculty found:', faculty);
  
    const user = faculty || student;
  
    console.log('User found:', user);
  
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect instituteEmail or password', 401));
    }
  
    createSendToken(user, 200, res);
  });
  

  //LOGOUT 
  const logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });
    console.log(res);
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
    const isPasswordValid = await user.correctPassword(oldPassword,user.password);
  
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

  
  export {login,logout,changePassword};
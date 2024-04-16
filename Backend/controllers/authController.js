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
  
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user
      }
    });
  };

const login = catchAsync(async (req, res, next) => {
    const { instituteEmail, password } = req.body;
    if(!instituteEmail || !password) return next(new AppError('Please enter all details',400))
    // 1) Check if instituteEmail and password exist
    const student = await Student.findOne({instituteEmail}).select('+password');
    const faculty = await Faculty.findOne({instituteEmail}).select('+password');

    const user = faculty || student;
   
    // console.log(user);
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect instituteEmail or password', 401));
    }
    
    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);

   /*  if (user instanceof Faculty) {
        if (user.role === 'admin') {
          res.redirect('/admin-page'); // render the admin page for users with role 'admin'
        } else if (user.role === 'student') {
          res.redirect('/student-page'); // render the student page for users with role 'student'
        }
      } else if (user instanceof Student) {
        res.redirect('/user2-page');
      } */
  });

  const protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (  //tokens are contained in authorization named headers
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    )
     {
      token = req.headers.authorization.split(' ')[1];
    }
  
    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }
  
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);//promisify(in util library ) to use async await
  
    // 3) Check if user still exists
    const student = await Student.findById(decoded.id);
    const faculty = await Faculty.findById(decoded.id);

    const currentUser = student || faculty;
    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }
  
    // 4) Check if user changed password after the token was issued
    /* if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError('User recently changed password! Please log in again.', 401)
      );
    }
    */
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser; //store the user in req.user to use further in other functions
    next();
  });

  export {login,protect};
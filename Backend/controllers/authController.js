import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import Faculty from '../models/Faculty.model.js';
import Student from '../models/Student.model.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

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
    const { email, password } = req.body;
    if(!email || !password) return next(new AppError('Please enter all details',400))
    // 1) Check if email and password exist
    const student = await Student.find({email,password});
    const faculty = await Faculty.find({email,password});

    const user = faculty || student;
   
    
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }
  
    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);

    if (user instanceof UserModel1) {
        if (user.role === 'admin') {
          res.redirect('/admin-page'); // render the admin page for users with role 'admin'
        } else if (user.role === 'student') {
          res.redirect('/student-page'); // render the student page for users with role 'student'
        }
      } else if (user instanceof UserModel2) {
        res.redirect('/user2-page');
      }
  });

  export {login};
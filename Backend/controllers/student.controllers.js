import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import User from '../models/Student.model.js'
const cookieOptions = {
  secure: process.env.NODE_ENV === "production" ? true : false,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  httpOnly: true,
};

const registerStudent = catchAsync(async (req, res, next) => {
  // Destructuring the necessary data from req object
  const {
    rollNo,
    username,
    password,
    name,
    batch,
    instituteEmail,
    personalEmail,
    branch,
    graduationYear,
  } = req.body;

  // Check if the data is there or not, if not throw error message
  if (
    (!rollNo,
    !username,
    !password,
    !name,
    !batch,
    !instituteEmail,
    !personalEmail,
    !branch,
    !graduationYear)
  ) {
    return next(new AppError("All fields are required", 400));
  }

  // Check if the user exists with the provided email
  const userExists = await User.findOne({ instituteEmail });

  // If user exists send the reponse
  if (userExists) {
    return next(new AppError("Email already exists", 409));
  }

  // Create new user with the given necessary data and save to DB
  const studentUser = await User.create({
    rollNo,
    username,
    password,
    name,
    batch,
    instituteEmail,
    personalEmail,
    branch,
    graduationYear,
  });

  // If user not created send message response
  if (!studentUser) {
    return next(
      new AppError("User registration failed, please try again later", 400)
    );
  }

  // Save the user object
  await studentUser.save();

  // Generating a JWT token
  const token = await studentUser.generateJWTToken();

  // Setting the password to undefined so it does not get sent in the response
  studentUser.password = undefined;

  // Setting the token in the cookie with name token along with cookieOptions
  res.cookie("token", token, cookieOptions);

  // If all good send the response to the frontend
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user,
  });
});

const loginStudent = catchAsync(async (req, res, next) => {
  // Destructuring the necessary data from req object
  const { instituteEmail, password } = req.body;

  // Check if the data is there or not, if not throw error message
  if (!instituteEmail || !password) {
    return next(new AppError("Email and Password are required", 400));
  }

  // Finding the user with the sent email
  const user = await User.findOne({ email }).select("+password");

  // If no user or sent password do not match then send generic response
  if (!(user && (await user.comparePassword(password)))) {
    return next(
      new AppError("Email or Password do not match or user does not exist", 401)
    );
  }

  // Generating a JWT token
  const token = await user.generateJWTToken();

  // Setting the password to undefined so it does not get sent in the response
  user.password = undefined;

  // Setting the token in the cookie with name token along with cookieOptions
  res.cookie("token", token, cookieOptions);

  // If all good send the response to the frontend
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user,
  });
});
const logoutStudent = catchAsync(async (_req, res, _next) => {
  // Setting the cookie value to null
  res.cookie("token", null, {
    secure: process.env.NODE_ENV === "production" ? true : false,
    maxAge: 0,
    httpOnly: true,
  });

  // Sending the response
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
});

const getLoggedInUserDetails = catchAsync(async (req, res, _next) => {
  // Finding the user using the id from modified req object
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    message: "User details",
    user,
  });
});

const forgotPassword = () => {};
const changePassword = () => {};

export {registerStudent,getLoggedInUserDetails,loginStudent,logoutStudent,forgotPassword,changePassword}
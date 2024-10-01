import catchAsync from "../utils/catchAsync.js";
import AppError from '../utils/appError.js';
import jwt from 'jsonwebtoken';

const authMiddleware = catchAsync(async (req, res, next) => {
  console.log("inside auth middleware ");

  // Extracting token from the cookies using the key 'JWT_TOKEN'
  const { JWT_TOKEN: token } = req.cookies;

  // If no token, send unauthorized message
  if (!token) {
    return next(new AppError("Unauthorized", 401));
  }

  // Decoding the token using jwt package verify method
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  console.log("token: >>>>>>"+token);
  console.log("decoded:"+decoded);

  // If no decode, send the message unauthorized
  if (!decoded) {
    return next(new AppError("Unauthorized, please login to continue", 401));
  }

  // If all good, store the id in req object, here we are modifying the request object and adding a custom field user in it
  req.user = decoded;
  console.log("user is present ");

  // Call next to pass the flow of execution further
  next();
});

export { authMiddleware };














// import catchAsync from "../utils/catchAsync.js";
// import AppError from '../utils/appError.js';
// import jwt from 'jsonwebtoken';

// const authMiddleware = catchAsync(async (req, res, next) => {
// //<<<<<<< HEAD
//   console.log("inside auth middleware ");
// // =======
// // >>>>>>> origin/main
//     // extracting token from the cookies
//   const { token } = req.cookies;

//   // If no token send unauthorized message
//   if (!token) {
//     return next(new AppError("Unauthorized", 401));
//   }

//   // Decoding the token using jwt package verify method
//   const decoded = await jwt.verify(token, process.env.JWT_SECRET);
//   console.log("token: >>>>>>"+token);
//   console.log("decoded:"+decoded);
//   // If no decode send the message unauthorized
//   if (!decoded) {
//     return next(new AppError("Unauthorized, please login to continue", 401));
//   }

//   // If all good store the id in req object, here we are modifying the request object and adding a custom field user in it
//   req.user = decoded;
// //<<<<<<< HEAD
// console.log("user is present ");
// // =======

// // >>>>>>> origin/main
//   // Do not forget to call the next other wise the flow of execution will not be passed further
//   next();
       
//   });

//   export {authMiddleware}
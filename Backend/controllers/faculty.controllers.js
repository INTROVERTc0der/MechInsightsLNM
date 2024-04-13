import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Faculty from "../models/Faculty.model.js"
import Form from "../models/Forms.model.js"
import Student from "../models/Student.model.js"

const registerFaculty = catchAsync(async (req, res, next) => {
  // Destructuring the necessary data from req object
  const { facultyId, name, username, post, instituteEmail, personalEmail, password, role } = req.body;

  // Check if the data is there or not, if not throw error message
  if (!facultyId, !name, !username, !post, !instituteEmail, !personalEmail, !password, !role) {
    return next(new AppError('All fields are required', 400));
  }

  // Check if the user exists with the provided email
  const userExists = await Faculty.findOne({ instituteEmail });

  // If user exists send the reponse
  if (userExists) {
    return next(new AppError('Email already exists', 409));
  }

  // Create new user with the given necessary data and save to DB
  const user = await Faculty.create({
    facultyId,
    name,
    username,
    post,
    instituteEmail,
    personalEmail,
    password,
    role
  }
  );

  // If user not created send message response
  if (!user) {
    return next(
      new AppError('User registration failed, please try again later', 400)
    );
  }
  /* 
      // Save the user object
      //await user.save();
    
      // Generating a JWT token
      const token = await Faculty.generateJWTToken();
    
      // Setting the password to undefined so it does not get sent in the response
      Faculty.password = undefined;
    
      // Setting the token in the cookie with name token along with cookieOptions
      res.cookie('token', token, cookieOptions); */

  // If all good send the response to the frontend
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    user,
  });
});

const loginFaculty = () => {

}
const logoutFaculty = () => {

}
const getLoggedInUserDetails = () => {

}
const forgotPassword = () => {

}
const changePassword = () => {

}

const distributeForms = catchAsync(async (req,res,next)=>{
   const {formId,batch} = req.body;
   const form = await Form.find({formId}).exec();
   const name = form[0].name;
   //console.log(form.name);
   console.log(name);
   if (!form) {
    return res.status(404).json({ message: 'Form not found' });
  }

  const students = await  Student.find({batch});
  
  students.forEach(students => {

    students.form_links.push(name);
    students.save();
  })

  res.status(201).json({
    status: 'form distributed successfully',
  });
});



const addForm = catchAsync(async (req, res, next) => {
  // const {name,formId,link} = req.body;

  const newForm = await Form.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      form: newForm
    }
  });
});
export { loginFaculty, logoutFaculty, getLoggedInUserDetails, forgotPassword, changePassword, registerFaculty, distributeForms, addForm }
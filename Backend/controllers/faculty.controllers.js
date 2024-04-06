export const registerFaculty =asyncHandler(async (req, res, next) => {
    // Destructuring the necessary data from req object
    const { facultyId,name, username,post,InstituteEmail,personalEmail,password,role } = req.body;
  
    // Check if the data is there or not, if not throw error message
    if (!facultyId,!name, !username,!post,!InstituteEmail,!personalEmail,!password,!role) {
      return next(new AppError('All fields are required', 400));
    }
  
    // Check if the user exists with the provided email
    const userExists = await Faculty.findOne({ InstituteEmail });
  
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
        InstituteEmail,
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

    // Save the user object
    await Faculty.save();
  
    // Generating a JWT token
    const token = await Faculty.generateJWTToken();
  
    // Setting the password to undefined so it does not get sent in the response
    Faculty.password = undefined;
  
    // Setting the token in the cookie with name token along with cookieOptions
    res.cookie('token', token, cookieOptions);
  
    // If all good send the response to the frontend
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user,
    });
  });
  
export const loginFaculty=()=>{

}
export const logoutFaculty=()=>{

}
export const getLoggedInUserDetails=()=>{

}
export const forgotPassword=()=>{

}
export const changePassword=()=>{

}
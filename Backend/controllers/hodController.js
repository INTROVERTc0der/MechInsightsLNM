import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import xlsx from 'xlsx'
import bcrypt from 'bcrypt';
import Student from '../models/Student.model.js'
import Faculty from "../models/Faculty.model.js";
import responses from "../models/ResponsesModel.js";

const registerStudents = catchAsync(async (req, res, next) => {
    try {
        // Read the uploaded Excel file from the buffer
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        // Get the first sheet name
        const sheetName = workbook.SheetNames[0];
        // Get the sheet object
        const sheet = workbook.Sheets[sheetName];
        // Convert the sheet to JSON array
        const data = xlsx.utils.sheet_to_json(sheet);

        for (const record of data) {
            const { name, rollno, email, batch } = record;
            if (!name || !rollno || !email || !batch) res.status(401).json("Either column is missing or column name is incorrect")
            // Check if the user already exists
            let existingUser = await Student.findOne({ rollNo: rollno });
            if (existingUser) {
                continue; // Skip existing users
            }

          
            const user = new Student({
                name,
                rollNo: rollno,
                password: email,
                instituteEmail: email,
                batch,
            });

            // Save the user to the database
           await user.save();
        }

        // Send success response
        res.status(200).send('Students registered successfully');
    } catch (error) {
        console.error('Error registering students:', error);
        res.status(500).send('Error registering students');
    }
});

const registerFaculty = catchAsync(async(req,res,next)=>{
    const {facultyId,name,instituteEmail,post}  = req.body;
    if(!name || !instituteEmail || !facultyId || !post) return next(new AppError("All fields are required", 400));

    const userExist = await Faculty.find({ instituteEmail });
    
    if (userExist.length > 0) {
      return next(new AppError("user already exists", 400));
    }
    const password=instituteEmail;
    
    const newUser= new Faculty({
        name,
        instituteEmail,
        password,
        facultyId,
        post
    });

    await newUser.save();
    res.status(201).json({
        message: "User registered successfully",
        data: {
          data: newUser,
        },
      });
})

const deleteResponses = catchAsync(async(req,res,next)=>{

    const {batch}=req.body;
    const result = await responses.deleteMany({batch});
    if (result.deletedCount === 0) {
        return next(new AppError('No responses found for this batch', 404));
      }
    
      res.status(204).json({
        status: 'success',
        data: null
      });
})
export { registerStudents,registerFaculty ,deleteResponses};


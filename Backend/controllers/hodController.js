import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import xlsx from 'xlsx'
import bcrypt from 'bcrypt';
import Student from '../models/Student.model.js'
import Faculty from "../models/Faculty.model.js";
import responses from "../models/ResponsesModel.js";
import Responses from "../models/ResponsesModel.js";
import Course from "../models/CourseModel.js";
import Forms from "../models/Forms.model.js";

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

const registerFaculty = catchAsync(async (req, res, next) => {
    try {
      const { facultyId, name, instituteEmail, post } = req.body;
  
      // Validate input fields
      if (!name || !instituteEmail || !facultyId || !post) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Check if the faculty already exists
      const userExist = await Faculty.findOne({ instituteEmail });
      if (userExist) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Generate a default password (consider hashing it)
      const Password = instituteEmail;
  
      // Hash the password before saving it
      //const hashedPassword = await bcrypt.hash(Password, 12);
  
      // Create a new faculty member
      const newUser = new Faculty({
        name,
        instituteEmail,
        password: Password, // Store hashed password
        facultyId,
        post,
      });
  
      // Save the new user to the database
      await newUser.save();
  
      // Send success response to client
      res.status(201).json({
        message: "Faculty registered successfully",
        data: {
          facultyId: newUser._id,  // or any other relevant info
          name: newUser.name,
          instituteEmail: newUser.instituteEmail,
          post: newUser.post,
        },
      });
    } catch (error) {
      console.error('Error registering faculty:', error);
      res.status(500).json({ message: "Error registering faculty" });
    }
  });
const deleteResponses = catchAsync(async(req,res,next)=>{
    console.log("hey")
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

const allresult = catchAsync(async (req, res, next) => {
  // Fetch all faculty members with their issued forms
  const faculties = await Faculty.find().populate('form_issued');

  if (!faculties || faculties.length === 0) {
    return res.status(404).json({
      status: 'fail',
      message: 'No faculty found',
    });
  }

  // Collect statistics for all forms issued by all faculty members
  const result = await Promise.all(
    faculties.flatMap(faculty => 
      faculty.form_issued.map(async (response) => {
        if (!response) return null; // Early exit if no response

        const course = await Course.findOne({ batch: response.batch });

        const totalFormsDistributed = course ? course.rollNo.length : 0;
        const totalFormsFilled = response.submittedBy.length;
        const totalResponses = response.answers.length;

        const averages = Array(15).fill(0);

        response.answers.forEach(answerArray => {
          answerArray.forEach((answer, index) => {
            averages[index] += answer;
          });
        });

        const average_array = averages.map(sum => (totalResponses > 0 ? (sum / totalResponses) : 0));

        return {
          "Name": response.f_type,
          "Batch": response.batch,
          "Semester": course ? course.semester : null,
          "Total Forms distributed": totalFormsDistributed,
          "Total Forms Filled": totalFormsFilled,
          "average_array%": average_array.map(avg => Math.round(avg))
        };
      })
    )
  );

  // Filter out nulls
  const filteredResult = result.filter(form => form !== null);

  res.status(200).json({
    status: 'success',
    data: filteredResult,
  });
});






const poCalculation = catchAsync(async (req, res, next) => {
  console.log(req);
  const { batch } = req.query;
  console.log(batch);

  try {
      // Fetch all responses for the given batch
      const allresponses = await responses.find({ batch });

      // Initialize an array to hold the sums for each PSO outcome
      const sums = new Array(15).fill(0);

      // Initialize a variable to hold the total number of students
      let totalStudents = 0;

      // Calculate the sums for each question and count total students
      allresponses.forEach(response => {
          const numberOfStudents = response.answers.length;
          totalStudents += numberOfStudents;

          response.answers.forEach((answerSet) => {
              answerSet.forEach((answer, index) => {
                  sums[index] += answer;
              });
          });
      });

      // Calculate the average for each PSO outcome
      const psoOutcomes = sums.map(sum => sum / totalStudents);

      res.json({
          batch,
          totalStudents,
          psoOutcomes,
      });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
})

export { registerStudents,registerFaculty ,deleteResponses,poCalculation,allresult};


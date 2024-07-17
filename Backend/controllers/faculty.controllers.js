import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Faculty from "../models/Faculty.model.js";
import Forms from "../models/Forms.model.js";
import Student from "../models/Student.model.js";
import Course from "../models/CourseModel.js";
import xlsx from "xlsx";
import Responses from "../models/ResponsesModel.js";

const distributeForms = catchAsync(async (req, res, next) => {
  const { id } = req.user; //faculty id who is logged in 
  console.log(id);
  const { f_type, description , batch, courseName } = req.body;
  if (!f_type || !batch) {
    return res.status(404).json({ message: "Enter proper details" });
  }

  const newForm = await Responses.create({
    //ye chiz response vale m karni h
    f_type,
    description,
    batch,
  });
  console.log(newForm._id)
  const course = await Course.findOne({ courseName, batch });
  if (!course) {
    return next(new AppError('Course not found', 404));
  }

  //pushing formId to student DB
  const rollNumbers = course.rollNo;
  const result=  await Student.updateMany(
    { rollNo: { $in: rollNumbers } },
    { $push: { form_links: newForm } }
  )
  
  //pushing formId to faculty DB
  const faculty = await Faculty.findById(id);
  console.log(faculty.name);
  faculty.form_issued.push(newForm);
  faculty.save();

  res.status(200).json({
    status: "form distributed successfully",
  });
});

const courses = ["Physics", "Chemistry", "Maths"];
const homePage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const faculty = await Faculty.findById(id).populate("form_issued").exec();

  res.render("faculty", { faculty });
});

const enrollStudents = catchAsync(async (req, res, next) => {
  try {
    // Read the uploaded Excel file from the buffer
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    // Get the first sheet name
    const sheetName = workbook.SheetNames[0];
    // Get the sheet object
    const sheet = workbook.Sheets[sheetName];
    // Convert the sheet to JSON array
    const data = xlsx.utils.sheet_to_json(sheet);

    // Iterate through each record in the JSON array
    for (const record of data) {
      const { course_name, batch, rollno, semester } = record;
      if(!course_name || !batch || !rollno || !semester) res.status(401).json('Invalid column names')
      // Find the course in the database
      let course = await Course.findOne({ courseName: course_name, batch: batch, semester: semester});

      if (course) {
        // If course already exists, add the roll number if it's not already in the array
        if (!course.rollNo.includes(rollno)) {
          course.rollNo.push(rollno);
        }
      } else {
        // If course doesn't exist, create a new one
        course = new Course({
          courseName: course_name,
          batch: batch,
          semester: semester,
          rollNo: [rollno]
        });
      }

      // Save the course to the database
      await course.save();
    }

    // Send success response
    res.status(200).send('Students registered successfully');
  } catch (error) {
    console.error('Error registering students:', error);
    res.status(500).send('Error registering students');
  }
});

const createForm= catchAsync(async(req,res,next)=>{
  const newForm = new Forms({
    f_type:'Workshop',
    questions:[
      'How would you rate the workshop',
      'How likely are you to recommend our service to others?',
      'What can we do to improve our service?',
      'How often do you use our service?',
      'How would you rate the quality of our products?',
      'How would you rate the value for money of our products?',
      'How would you rate the friendliness of our staff?',
      'How would you rate the speed of our service?',
      'How would you rate the cleanliness of our facilities?',
      'How would you rate the overall experience with our service?',
      'What other services would you like us to offer?',
      'How did you hear about our service?',
      'What do you like most about our service?',
      'What do you like least about our service?',
      'Any additional comments or suggestions?',
    ]
  })

  await newForm.save();
  res.send("form creation success")
});

const seeResults = catchAsync(async(req,res,next)=>{
   const {id} = req.user; //id of faculty currently logged in
})

const profile = catchAsync(async(req,res,next)=>{

})
export {  distributeForms, homePage, enrollStudents,createForm ,seeResults,profile};

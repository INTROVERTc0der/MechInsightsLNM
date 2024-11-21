import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Faculty from "../models/Faculty.model.js";
import Forms from "../models/Forms.model.js";
import Student from "../models/Student.model.js";
import Course from "../models/CourseModel.js";
import xlsx from "xlsx";
import Responses from "../models/ResponsesModel.js";


const distributeForms = catchAsync(async (req, res, next) => {
  try {
    console.log("Controller: distributeForms called.");
    console.log(req.body);
    console.log(req.user);
    const { id } = req.user; // Logged-in faculty ID
    console.log("Logged-in Faculty ID:", id);

    const { form_name, description, batch, course } = req.body;
    const f_type=form_name;
    const courseName=course;
    if (!f_type || !batch) {
      console.log("Validation failed: Missing f_type or batch");
      return res.status(404).json({ message: "Enter proper details" });
    }

    const newForm = await Responses.create({
      f_type,
      description,
      batch,
    });
    console.log("New form created:", newForm);

    const Courses = await Course.findOne({ courseName, batch });
    if (!Courses) {
      console.log("Course not found for", courseName, batch);
      return next(new AppError("Course not found", 404));
    }
    console.log("Course found:", Course);

    const rollNumbers = Courses.rollNo;
    const result = await Student.updateMany(
      { rollNo: { $in: rollNumbers } },
      { $push: { form_links: newForm } }
    );
    console.log("Form IDs pushed to students:", result);

    const faculty = await Faculty.findById(id);
    if (!faculty) {
      console.log("Faculty not found for ID:", id);
      return next(new AppError("Faculty not found", 404));
    }
    console.log("Faculty found:", faculty.name);

    faculty.form_issued.push(newForm);
    await faculty.save();
    console.log("formed issued saved in faculty data base ")
    res.status(200).json({
      success: true,
      status: "Form distributed successfully",
    });
  } catch (error) {
    console.error("Error in distributeForms:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
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

const formNames=catchAsync(async (req, res) => {
  try {
    // Fetch distinct f_type values from the Forms collection
    const formTypes = await Forms.distinct('f_type');

    // Send the array of form types as a response
    res.json(formTypes);
  } catch (error) {
    console.error('Error fetching form types:', error);
    res.status(500).json({ error: 'Failed to fetch form types' });
  }
})


const seeResults = catchAsync(async(req,res,next)=>{
   const {id} = req.user; //id of faculty currently logged in
   const faculty = await Faculty.findById(id).populate('form_issued');

  if (!faculty) {
    return next(new Error('Faculty not found'));
  }
  // const formIds = faculty.form_issued.map(form => mongoose.Types.ObjectId(form._id));
  const formIds = faculty.form_issued.map(form => form._id);

  // Fetch all responses for the issued forms
  // const responses = await Responses.findById(formIds);
  const responses = await Responses.find({ _id: { $in: formIds } });

  if (responses.length === 0) {
    return res.status(200).json({ averages: [] });
  }

  const formResponses = {};

  // Organize responses by form type
  responses.forEach(response => {
    const formId = response._id.toString();
    if (!formResponses[formId]) {
      formResponses[formId] = [];
    }
    formResponses[formId].push(...response.answers);
  });

  const averages = {};

  for (const formId in formResponses) {
    console.log(formId);
    const allAnswers = formResponses[formId];

    console.log(allAnswers);
    const questionCount = allAnswers[0].length;
    console.log(questionCount);
    const formAverages = Array(questionCount).fill(0);

    allAnswers.forEach(answers => {
      answers.forEach((answer, index) => {
        formAverages[index] += answer;
      });
    });
    console.log(formAverages);
    formAverages.forEach((total, index) => {
      formAverages[index] = total / allAnswers.length;
    });

    averages[formId] = formAverages;
    res.status(200).json({ averages })
  }

})

const profile = catchAsync(async(req,res,next)=>{
  const { id } = req.user;
  const user = await Faculty.findById(id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({ user })
})


const getFormStatistics = catchAsync(async (req, res, next) => {
  const { id } = req.user; // Faculty ID coming from the request params

  // Find the faculty by ID
  const faculty = await Faculty.findById(id).populate('form_issued');

  if (!faculty) {
    return res.status(404).json({
      status: 'fail',
      message: 'Faculty not found',
    });
  }

  const result = await Promise.all(faculty.form_issued.map(async (response) => {
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
  }));

  // Filter out nulls
  const filteredResult = result.filter(form => form !== null);

  res.status(200).json({
    status: 'success',
    data: filteredResult,
  });
});

export {  distributeForms, homePage, enrollStudents,createForm ,seeResults,profile,getFormStatistics,formNames};

import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Responses from "../models/ResponsesModel.js";
import Forms from "../models/Forms.model.js";
import Student from "../models/Student.model.js";

const formList = catchAsync(async (req, res, next) => {
    console.log("inside the formList controllers")
    const { id } = req.user; //student which is logged in
    const student = await Student.findById(id).populate('form_links');

    const forms = student.form_links.map(form => ({
        f_type: form.f_type,
        description: form.description,
    }));
    console.log("forms names : >>>>> "+forms)

    res.status(200).json({
        status: 'success',
        data: {
            forms,
        },
    });

});

//on click of that form questions will come into response and than can be shown on frontend
const getQuestionsbyFormType = catchAsync(async (req, res, next) => {

    // const {responseId} = req.params;
    // const response = await Responses.findById(responseId);
    // const f_type = response.f_type;
    const {f_type} = req.params

    const form = await Forms.findOne({f_type });
    console.log(form);
    if (!form) {
        return next(new AppError('Form type not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            questions: form.questions,
        },
    });
});

const submitResponses = catchAsync(async(req,res,next)=>{
    const {f_type}=req.params; //jis response model m answers array bhejna h
    const {id}=req.user; //student logged in id
    const student = await Student.findById(id);
    if (!student) {
        return res.status(404).json({
            status: 'fail',
            message: 'Student not found',
        });
    }

    const response = await Responses.findOne({f_type});
    if (!response) {
        return res.status(404).json({
          status: 'fail',
          message: 'Form not found',
        });
    }

    // const { a1, a2, a3, a4, a5, a6, a7, a8, a9, a10,a11,a12,a13,a14,a15 } = req.body;
    // const resarray = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10,a11,a12,a13,a14,a15];

    // response.answers.push(resarray);
    // await response.save();
    const { answers } = req.body;
    if (!Array.isArray(answers) || answers.length !== 15) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid answers array',
        });
    }

    response.answers.push(answers);
    await response.save();
    console.log("succuessful");

    // //to delete that form_links id from student array after he had submitted form
    // student.form_links = student.form_links.filter(id => id.toString() !== f_type);
    // await student.save();

    res.status(200).json({
        status: 'success',
        data: {
          response,
        },
      });
})
const profile = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const user = await Student.findById(id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user })
})

export { formList, getQuestionsbyFormType,submitResponses,profile}
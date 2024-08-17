import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Responses from "../models/ResponsesModel.js";
import Forms from "../models/Forms.model.js";
import Student from "../models/Student.model.js";

const formList = catchAsync(async (req, res, next) => {
    const { id } = req.user; //student which is logged in
    const student = await Student.findById(id).populate('form_links');

    const forms = student.form_links.map(form => ({
        f_type: form.f_type,
        description: form.description,
    }));

    res.status(200).json({
        status: 'success',
        data: {
            forms,
        },
    });

})

//on click of that form questions will come into response and than can be shown on frontend
const getQuestionsbyFormType = catchAsync(async (req, res, next) => {
    const { responseId } = req.params;
    const response = await Responses.findById(responseId);
    const f_type = response.f_type;

    const form = await Forms.findOne({ f_type });
    console.log(f_type);
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

const submitResponses = catchAsync(async (req, res, next) => {
    const { responseId } = req.params; //jis response model m answers array bhejna h
    const { id } = req.user; //student logged in id
    const student = await Student.findById(id);

    const response = await Responses.findById(responseId);
    if (!response) {
        return res.status(404).json({
            status: 'fail',
            message: 'Form not found',
        });
    }
    const { a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15 } = req.body;
    const resarray = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15];

    response.answers.push(resarray);
    await response.save();

    //to delete that form_links id from student array after he had submitted form
    student.form_links = student.form_links.filter(id => id.toString() !== responseId);
    await student.save();

    res.status(200).json({
        status: 'success',
        data: {
            response,
        },
    });
})

const profile = catchAsync(async (req, res, next) => {
    const { id } = req.user;
    const user = await Student.findById(id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user })
})

export { formList, getQuestionsbyFormType, submitResponses, profile }
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Faculty from "../models/Faculty.model.js"
import Forms from "../models/Forms.model.js"
import Student from "../models/Student.model.js"


const batches = catchAsync(async (req, res, next) => {
    // Find distinct branches
    const distinctBranches = await Student.distinct('branch');
  
    res.status(200).json({
      status: 'success',
      data: {
        branches: distinctBranches,
      },
    });
  });

const fillForm = catchAsync(
    async (req, res) => {
        //cookies  
        console.log(req.params.id)
        const { id } = req.params;
        const form = await Forms.findById(id).exec();
        console.log(form);
        const form_type = form.f_type;
        console.log(form_type);
        if (form_type === 'internship')
            res.render('forms/internship', { form });
        if (form_type === 'course')
            res.render('forms/course', { form });
        if (form_type === 'industrialvisit')
            res.render('forms/industrialvisit', { form });
        if (form_type === 'workshop')
            res.render('forms/workshop', { form });
    }
)

const getResponse = async (req, res) => {
    console.log("Hi")
    const { a1, a2, a3, a4, a5, a6, a7, a8, a9, a10 } = req.body;
    const { id } = req.params;
    const form = await Forms.findById(id).exec();
    const response = {
        q1: a1,
        q2: a2,
        q3: a3,
        q4: a4,
        q5: a5,
        q6: a6,
        q7: a7,
        q8: a8,
        q9: a9,
        q10: a10,
    }

    form.responses.push(response);
    await form.save();
    res.send('Your Responses have been submitted')
}

const viewResult = async (req, res) => {
    const { id } = req.params;
    const form = await Forms.findById(id).exec();
    const responses = form.responses;
    let s1 = 0;
    let a1 = 0;
    for (let response of responses) {
        s1 += (response.q1)
    }
    a1 = (s1 / (responses.length)).toFixed(2);

    let s2 = 0;
    let a2 = 0;
    for (let response of responses) {
        s2 += (response.q2)
    }
    a2 = (s2 / (responses.length)).toFixed(2);

    let s3 = 0;
    let a3 = 0;
    for (let response of responses) {
        s3 += (response.q3)
    }
    a3 = (s3 / (responses.length)).toFixed(2);

    let s4 = 0;
    let a4 = 0;
    for (let response of responses) {
        s4 += (response.q4)
    }
    a4 = (s4 / (responses.length)).toFixed(2);

    let s5 = 0;
    let a5 = 0;
    for (let response of responses) {
        s5 += (response.q5)
    }
    a5 = (s5 / (responses.length)).toFixed(2);

    let s6 = 0;
    let a6 = 0;
    for (let response of responses) {
        s6 += (response.q6)
    }
    a6 = (s6 / (responses.length)).toFixed(2);

    let s7 = 0;
    let a7 = 0;
    for (let response of responses) {
        s7 += (response.q7)
    }
    a7 = (s7 / (responses.length)).toFixed(2);

    let s8 = 0;
    let a8 = 0;
    for (let response of responses) {
        s8 += (response.q8)
    }
    a8 = (s8 / (responses.length)).toFixed(2);

    let s9 = 0;
    let a9 = 0;
    for (let response of responses) {
        s9 += (response.q9)
    }
    a9 = (s9 / (responses.length)).toFixed(2);

    let s10 = 0;
    let a10 = 0;
    for (let response of responses) {
        s10 += (response.q10)
    }
    a10 = (s10 / (responses.length)).toFixed(2);

    res.render('results/internship', { a1, a2, a3, a4, a5, a6, a7, a8, a9, a10 })

    res.send(`Average of responses to this form are: ${a3}`)

}



export { fillForm, getResponse, viewResult,batches }



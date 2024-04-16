import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Faculty from "../models/Faculty.model.js"
import Forms from "../models/Forms.model.js"
import Student from "../models/Student.model.js"

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
    const responses = form.responses.length;
    res.send(`No of responses to this form are: ${responses}`)

}
export { fillForm, getResponse, viewResult }



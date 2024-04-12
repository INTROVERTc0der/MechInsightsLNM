import express from "express";
import { config } from "dotenv";
import path from 'path'; // Import path as ES module
import ejsMate from 'ejs-mate'; // Import ejsMate as ES module
//import { Cors } from "cors";
import Student from "./models/Student.model.js"

import cookieParser from "cookie-parser";
config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
import studentRoutes from './routes/student.routes.js'
import facultyRoutes from './routes/faculty.routes.js'
import formRoutes from './routes/form.routes.js'
import miscRoutes from './routes/misc.routes.js'

//routes
app.get('/', (req, res) => {
    res.status(404).json({ message: "hello from server" });
})

app.use('/api/v1/student_user', studentRoutes);
app.use('/api/v1/faculty_user', facultyRoutes);
app.use('/api/v1/forms', formRoutes);
app.use('/api/v1', miscRoutes);



//student ke pass


app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'views'))

/*app.get("/fillForms/internship/:id", async (req, res) => {
    //cookies  

    const { id } = req.params;
    const student = await Student.findById(id).exec();
    res.render('forms/internship', { student });
}); */

/* app.get("/student/:id", async (req, res) => {
    const id = req.params.id;
    const student = await Student.findById(id).exec();
    console.log(student);
    const formlink = student.form_links;
    console.log(formlink);
    res.render('student', { student, formlink });

}) 
*/
app.post('/Y21', (req, res) => {
    const { inlineCheckbox1, inlineCheckbox2 } = req.body;

    // Now you can use the received data as needed
    console.log("Checkbox 1:", inlineCheckbox1);
    console.log("Checkbox 2:", inlineCheckbox2);


    res.send("Responses Submitted");

})

//default catch all route -404
app.use('*', (req, res) => {
    res.status(404).send('OOPS!! 404 Page Not Found');
});

app.get('/ping', (req, res) => {
    res.send('Pong');
});

export default app;
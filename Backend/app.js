import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
//import { Cors } from "cors";
import Student from "./models/Student.model.js"
import studentRoutes from './routes/student.routes.js'
import facultyRoutes from './routes/faculty.routes.js'
import formRoutes from './routes/form.routes.js'
import hodRoutes from './routes/hodRoutes.js'
config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


//routes
app.get('/', (req, res) => {
    res.status(404).json({ message: "hello from server" });
})

app.use('/api/v1/user_student', studentRoutes);
app.use('/api/v1/user_faculty', facultyRoutes);
app.use('/api/v1/user_hod',hodRoutes);
app.use('/api/v1/forms', formRoutes);
//app.use('/api/v1/auth',authRoutes)

//default catch all route -404
app.use('*', (req, res) => {
    res.status(404).send('OOPS!! 404 Page Not Found');
});

app.get('/ping', (req, res) => {
    res.send('Pong');
});

export default app;
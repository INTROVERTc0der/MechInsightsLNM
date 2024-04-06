import  express  from "express";
import { config } from "dotenv";
import { Cors } from "cors";
import cookieParser from "cookie-parser";
config();
const app=express();

app.use(express.json());
app.use(cookieParser());

import studentRoutes from './routes/student.routes.js'
import facultyRoutes from './routes/faculty.routes.js'
import formRoutes from './routes/form.routes.js'
import miscRoutes from './routes/misc.routes.js'

//routes
app.use('/api/v1/student_user',studentRoutes);
app.use('/api/v1/faculty_user',facultyRoutes);
app.use('/api/v1/forms',formRoutes);
app.use('/api/v1',miscRoutes);


//default catch all route -404
app.app('*',(req,res)=>{
    res.status(404).send('OOPS!! 404 Page Not Found');
});

app.get('/ping',(req,res)=>{
    res.send('Pong');
});

export default app;
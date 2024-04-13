import { Router } from "express";
const router = Router();
import path from 'path'; // Import path as ES module
import ejsMate from 'ejs-mate'; // Import ejsMate as ES module
import { distributeForms } from '../controllers/faculty.controllers.js'
import Student from "../models/Student.model.js"
//student ke pass


router.post("/")

//faculty ke paas;
router.post("/sendForms", distributeForms);

router.get("/fillForms/internship/:id", async (req, res) => {
    //cookies  
    console.log("Hi")
    const { id } = req.params;
    const student = await Student.findById(id).exec();
    res.render('forms/internship', { student });
});

//router.get("/formResult", formResult);


//HOD/Admin 




export default router;

import { Router } from "express";
const router = Router();
import path from 'path'; // Import path as ES module
import ejsMate from 'ejs-mate'; // Import ejsMate as ES module
import { distributeForms } from '../controllers/faculty.controllers.js'
import { fillForm, getResponse, viewResult } from '../controllers/forms.controllers.js'
import Student from "../models/Student.model.js"
import Forms from "../models/Forms.model.js";
//student ke pass


router.post("/")

//faculty ke paas;
router.post("/sendForms", distributeForms);

router.get("/fillForms/:id", fillForm);

router.post("/:id", getResponse)

router.get("/viewResult/:id", viewResult)




//HOD/Admin 




export default router;

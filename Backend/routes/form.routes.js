import { Router } from "express";
const router = Router();

import { distributeForms } from '../controllers/faculty.controllers.js'
import { batches, fillForm, getResponse, viewResult } from '../controllers/forms.controllers.js'
import Student from "../models/Student.model.js"
import Forms from "../models/Forms.model.js";
//<<<<<<< HEAD
import { authMiddleware } from "../middlewares/auth.js";
// =======
// >>>>>>> origin/main
//student ke pass


router.get("/batches",authMiddleware,batches);

//faculty ke paas;
//<<<<< HEAD
router.post("/sendForms",authMiddleware, distributeForms);
// =======
// router.post("/sendForms", distributeForms);
// >>>>>>> origin/main

router.get("/fillForms/:id", fillForm);

router.post("/:id", getResponse)

router.get("/viewResult/:id", viewResult)




//HOD/Admin 




export default router;

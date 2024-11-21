import { Router } from "express";
const router = Router();

import { distributeForms } from '../controllers/faculty.controllers.js'
import { batches, fillForm, getResponse, viewResult } from '../controllers/forms.controllers.js'
import { authMiddleware } from "../middlewares/auth.js";

router.get("/batches",authMiddleware,batches);
//faculty ke paas;
router.post("/sendForms",authMiddleware, distributeForms);
router.get("/fillForms/:id", fillForm);
router.post("/:id", getResponse)
router.get("/viewResult/:id", viewResult)
//HOD/Admin 


export default router;

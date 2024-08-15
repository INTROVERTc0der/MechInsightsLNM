import { Router } from "express";
import { login,logout,changePassword} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/auth.js";
const router = Router();

import { formList, getQuestionsbyFormType, submitResponses } from "../controllers/student.controllers.js";

router.post('/login',login)

router.get("/logout", logout);
router.post('/changepassword',authMiddleware,changePassword)
router.get('/formList',authMiddleware,formList)
router.get('/questions/:f_type',authMiddleware,getQuestionsbyFormType)
router.post('/submitResponses/:f_type',authMiddleware,submitResponses)
export default router;
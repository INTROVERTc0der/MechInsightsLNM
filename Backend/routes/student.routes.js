import { Router } from "express";
import { login,logout,changePassword, forgetPassword, resetPassword} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/auth.js";
const router = Router();

import { formList, getQuestionsbyFormType, profile, submitResponses } from "../controllers/student.controllers.js";

router.post('/login',login)
router.post('/logout', logout);
router.post('/changepassword',authMiddleware,changePassword)
router.post('/forgetPassword', forgetPassword)
router.post('/resetPassword', resetPassword)
router.get('/formList',authMiddleware,formList)
router.get('/questions/:f_type',authMiddleware,getQuestionsbyFormType)
router.post('/submitResponses/:f_type',authMiddleware,submitResponses)
router.get('/profile/:id', profile);
export default router;
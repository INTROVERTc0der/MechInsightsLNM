import { Router } from "express";
import { login, logout, changePassword, forgetPassword, resetPassword, profile } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/auth.js";
const router = Router();

import { formList, getQuestionsbyFormType, submitResponses } from "../controllers/student.controllers.js";

<<<<<<< HEAD
router.post('/login',login)

router.get("/logout", logout);
router.post('/changepassword',authMiddleware,changePassword)
router.get('/formList',authMiddleware,formList)
router.get('/questions/:f_type',authMiddleware,getQuestionsbyFormType)
router.post('/submitResponses/:f_type',authMiddleware,submitResponses)
=======
router.post('/login', login)
router.get("/logout", logout);
router.post('/changepassword', authMiddleware, changePassword)
router.post('/forgetPassword', forgetPassword)
router.post('/resetPassword', resetPassword)
router.get('/formList', authMiddleware, formList)
router.get('/questions/:responseId', authMiddleware, getQuestionsbyFormType)
router.post('/submitResponses/:responseId', authMiddleware, submitResponses)
router.get('/profile/:id', profile);
>>>>>>> hemangCodesAgain
export default router;
import { Router } from "express";
import multer from "multer";
import {enrollStudents,distributeForms,homePage, createForm, seeResults, profile, getFormStatistics, formNames} from '../controllers/faculty.controllers.js'
import { login,logout,changePassword, forgetPassword, resetPassword} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router=Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/enrollStudents', upload.single('file'),authMiddleware,enrollStudents)

router.post("/distributeForms",authMiddleware,distributeForms);

//router.post("/addForm",addForm);

router.post("/login",login)
router.get('/logout',logout)
router.post('/changepassword',authMiddleware,changePassword)
router.post('/createForm',createForm)
router.get('/formnames',formNames);
router.post('/forgetPassword', forgetPassword)
router.post('/resetPassword', resetPassword)
router.post('/seeResults',authMiddleware,getFormStatistics)
router.get('/profile',authMiddleware,profile);

export default router;  
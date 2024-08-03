import { Router } from "express";
import multer from "multer";
import {enrollStudents,distributeForms,homePage, createForm, seeResults, profile} from '../controllers/faculty.controllers.js'
import { login,logout,changePassword} from "../controllers/authController.js";
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

router.post('/seeResults',authMiddleware,seeResults)
router.get('/profile/:id',profile);

export default router;  
import { Router } from "express";
import {registerStudent,getLoggedInUserDetails,loginStudent,logoutStudent,forgotPassword,changePassword} from '../controllers/student.controllers.js';
const router=Router();

router.post("/register",registerStudent);
router.post("/login",loginStudent);
router.post("/logout",logoutStudent);
router.get("/me",getLoggedInUserDetails);
router.post("/reset",forgotPassword);
//router.post("/reset/:resetToken", resetPassword);
router.post("/change-password",changePassword);

export default router;
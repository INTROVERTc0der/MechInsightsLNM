import { Router } from "express";
import { registerStudent, getLoggedInUserDetails, loginStudent, logoutStudent, forgotPassword, changePassword } from '../controllers/student.controllers.js';
const router = Router();
import Student from "../models/Student.model.js"
import Faculty from "../models/Faculty.model.js";
router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.get("/student/:id", async (req, res) => {
    const id = req.params.id;
    const student = await Student.findById(id).populate('form_links').exec();
    console.log(student);
    const forms = student.form_links;
    res.render('student', { student, forms });
})
router.post("/logout", logoutStudent);
router.get("/me", getLoggedInUserDetails);
router.post("/reset", forgotPassword);
//router.post("/reset/:resetToken", resetPassword);
router.post("/change-password", changePassword);

export default router;
import { Router } from "express";
import { registerStudent, getLoggedInUserDetails, loginStudent, logoutStudent, forgotPassword, changePassword } from '../controllers/student.controllers.js';
const router = Router();
import Student from "../models/Student.model.js"
router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.get("/student/:id", async (req, res) => {
    const id = req.params.id;
    const student = await Student.findById(id).exec();
    console.log(student);
    const formlink = student.form_links;
    console.log(formlink);
    res.render('student', { student, formlink });
})
router.post("/logout", logoutStudent);
router.get("/me", getLoggedInUserDetails);
router.post("/reset", forgotPassword);
//router.post("/reset/:resetToken", resetPassword);
router.post("/change-password", changePassword);

export default router;
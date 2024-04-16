import { Router } from "express";
import { loginFaculty, logoutFaculty, getLoggedInUserDetails, forgotPassword, changePassword, registerFaculty, distributeForms, addForm } from '../controllers/faculty.controllers.js'
const router = Router();
import Faculty from "../models/Faculty.model.js"
const courses = ['Physics', 'Chemistry', 'Maths'];

router.post("/register", registerFaculty);
router.post("/login", loginFaculty);
router.post("/logout", logoutFaculty);

router.get("/:id", async (req, res) => {
    const { id } = req.params.id;
    const faculty = await Faculty.findById(id).exec();
    res.render('faculty', { faculty, courses })
})
router.get("/me", getLoggedInUserDetails);
router.post("/reset", forgotPassword);

//router.post("/reset/:resetToken", resetPassword);
router.post("/change-password", changePassword);
router.post("/distributeForms", distributeForms);
router.post("/addForm", addForm);

export default router;
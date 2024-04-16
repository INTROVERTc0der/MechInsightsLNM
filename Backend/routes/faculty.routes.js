import { Router } from "express";

import { loginFaculty, logoutFaculty, getLoggedInUserDetails, forgotPassword, changePassword, registerFaculty, distributeForms, homePage } from '../controllers/faculty.controllers.js'
import { login } from "../controllers/authController.js";
import Faculty from "../models/Faculty.model.js";
const router = Router();

router.post("/register", registerFaculty);
router.post("/login", loginFaculty);
router.post("/logout", logoutFaculty);

router.get("/:id", homePage)
router.get("/me", getLoggedInUserDetails);
router.post("/reset", forgotPassword);


router.post("/register", registerFaculty);
router.get("/me", getLoggedInUserDetails);
router.post("/distributeForms", distributeForms);
//router.post("/addForm",addForm);
router.post("/login", login)
router.get("/:id", homePage)

export default router;
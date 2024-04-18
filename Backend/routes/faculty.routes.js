import { Router } from "express";

import {logoutFaculty,getLoggedInUserDetails,forgotPassword,changePassword,registerFaculty,distributeForms,homePage} from '../controllers/faculty.controllers.js'
import { login,protect,logout} from "../controllers/authController.js";
const router=Router();

router.get("/me", getLoggedInUserDetails);
router.post("/reset", forgotPassword);


router.post("/register",registerFaculty);
router.post("/distributeForms/:id",distributeForms);
//router.post("/addForm",addForm);
router.post("/login",login)
router.get("/:id",homePage)

export default router;
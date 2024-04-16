import { Router } from "express";
import {logoutFaculty,getLoggedInUserDetails,forgotPassword,changePassword,registerFaculty,distributeForms,homePage} from '../controllers/faculty.controllers.js'
import { login,protect } from "../controllers/authController.js";
const router=Router();



router.post("/register",registerFaculty);
router.get("/me",getLoggedInUserDetails);
router.post("/distributeForms",protect,distributeForms);
//router.post("/addForm",addForm);
router.post("/login",login)
router.get("/:id", protect,homePage)
export default router;
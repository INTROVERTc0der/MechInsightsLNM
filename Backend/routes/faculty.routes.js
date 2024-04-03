import { Router } from "express";
const router=Router();



router.post("/register",registerFaculty);
router.post("/login",loginFaculty);
router.post("/logout",logoutFaculty);
router.get("/me",isLoggedIn,getLoggdInUserDetails);
router.post("/reset",forgotPassword);
router.post("/reset/:resetToken", resetPassword);
router.post("/change-password", isLoggedIn, changePassword);


export default router;
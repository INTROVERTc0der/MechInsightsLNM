import { Router } from "express";
const router=Router();




router.post("/register",registerStudent);
router.post("/login",loginStudent);
router.post("/logout",logoutStudent);
router.get("/me",isLoggedIn,getLoggdInUserDetails);
router.post("/reset",forgotPassword);
router.post("/reset/:resetToken", resetPassword);
router.post("/change-password", isLoggedIn, changePassword);

export default router;
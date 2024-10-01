import { Router } from "express";
import multer from "multer";
import { allresult, deleteResponses, poCalculation, registerFaculty, registerStudents } from "../controllers/hodController.js";
import { authMiddleware } from "../middlewares/auth.js";
import { adminMiddleware } from "../middlewares/admin.js";

const router=Router();
console.log("heyyy")
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/registerStudents',upload.single('file'),authMiddleware,adminMiddleware,registerStudents)
router.post('/register_faculty',authMiddleware,adminMiddleware,registerFaculty)
router.post('/deleteResponses',authMiddleware,adminMiddleware,deleteResponses)
router.get('/all_result',authMiddleware,allresult);
router.get('/POattainments',poCalculation);

export default router;    
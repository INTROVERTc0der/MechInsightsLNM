import { Router } from "express";
import multer from "multer";
import { deleteResponses, registerFaculty, registerStudents, poCalculation } from "../controllers/hodController.js";
import { authMiddleware } from "../middlewares/auth.js";
import { adminMiddleware } from "../middlewares/admin.js";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/registerStudents', upload.single('file'), authMiddleware, adminMiddleware, registerStudents)
router.post('/register_faculty', authMiddleware, adminMiddleware, registerFaculty)
router.post('/deleteResponses', authMiddleware, adminMiddleware, deleteResponses)
router.post('/poCalculation', poCalculation);
export default router;    
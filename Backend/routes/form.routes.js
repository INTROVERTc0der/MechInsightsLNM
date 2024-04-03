import { Router } from "express";
const router=Router();

//student ke pass
router.get("/fillForms",formsToBeFilled);
router.post("/")//forms ki link


//faculty ke pass
router.post("/sendForms",distributeForms);
router.get("/showForms",showForms);
router.get("/formResult",formResult);


//HOD/Admin 




export default router;
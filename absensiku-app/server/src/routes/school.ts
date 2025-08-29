import { Router } from "express";
import { Controller } from "../controllers/schoolController";

const router = Router();

router.post("/schools", Controller.createSchool);
router.put("/schools/:id", Controller.updateSchool);

export default router;

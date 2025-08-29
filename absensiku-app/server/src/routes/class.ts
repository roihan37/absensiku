// routes/classRoutes.ts
import { Router } from "express";
import Controller from "../controllers/classController";

const router = Router();

// Create
router.post("/", Controller.createClass);

// Read all
router.get("/", Controller.getClasses);

// Read by id
router.get("/:id", Controller.getClassById);

// Update
router.put("/:id", Controller.updateClass);

// Delete
router.delete("/:id", Controller.deleteClass);

router.post("/:id/students", Controller.addStudentToClass);


export default router;

// src/routes/holiday.ts
import { Router } from "express";
import { Controller } from "../controllers/holidayController";

const router = Router();

router.get("/", Controller.getAll);        // GET semua holiday
router.get("/:id", Controller.getById);    // GET holiday by ID
router.post("/", Controller.create);       // Tambah holiday
router.put("/:id", Controller.update);     // Update holiday
router.delete("/:id", Controller.delete);  // Hapus holiday

export default router;

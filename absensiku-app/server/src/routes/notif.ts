import { Router } from "express";
import {
  Controller
} from "../controllers/notifController";

const router = Router();

// Create
router.post("/", Controller.createNotification);

// Read all
router.get("/", Controller.getNotifications);

// Read one
router.get("/:id", Controller.getNotificationById);

// Update
router.put("/:id", Controller.updateNotification);

// Delete
router.delete("/:id", Controller.deleteNotification);

export default router;

import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export class Controller {
  // Create Notification
  static async createNotification(req: Request, res: Response): Promise<void> {
    try {
      const { senderId, receiverId, title, message } = req.body;

      if (!senderId || !receiverId || !title || !message) {
        res.status(400).json({ error: "All fields are required" });
        return;
      }

      const notification = await prisma.notification.create({
        data: {
          senderId,
          receiverId,
          title,
          message,
        },
      });

      res.status(201).json({
        message: "Notification created successfully",
        data: notification,
      });
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Failed to create notification";
      res.status(500).json({ error: errMsg });
    }
  }

  // Get All Notifications
  static async getNotifications(req: Request, res: Response): Promise<void> {
    try {
      const notifications = await prisma.notification.findMany({
        include: {
          sender: { select: { id: true, name: true } },
          receiver: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: "desc" },
      });

      res.json({ data: notifications });
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Failed to fetch notifications";
      res.status(500).json({ error: errMsg });
    }
  }

  // Get Notification by ID
  static async getNotificationById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const notification = await prisma.notification.findUnique({
        where: { id: Number(id) },
        include: {
          sender: { select: { id: true, name: true } },
          receiver: { select: { id: true, name: true } },
        },
      });

      if (!notification) {
        res.status(404).json({ error: "Notification not found" });
        return;
      }

      res.json({ data: notification });
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Failed to fetch notification";
      res.status(500).json({ error: errMsg });
    }
  }

  // Update Notification
  static async updateNotification(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, message, isRead } = req.body;

      const updatedNotification = await prisma.notification.update({
        where: { id: Number(id) },
        data: { title, message, isRead },
      });

      res.json({
        message: "Notification updated successfully",
        data: updatedNotification,
      });
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Failed to update notification";
      res.status(500).json({ error: errMsg });
    }
  }

  // Delete Notification
  static async deleteNotification(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      await prisma.notification.delete({
        where: { id: Number(id) },
      });

      res.json({ message: "Notification deleted successfully" });
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Failed to delete notification";
      res.status(500).json({ error: errMsg });
    }
  }
}

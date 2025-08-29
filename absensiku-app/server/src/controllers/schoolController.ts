import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export class Controller {
  // Create School
  static async createSchool(req: Request, res: Response): Promise<void> {
    try {
      const {
        name,
        jenjang,
        npsn,
        nss,
        phoneNumber,
        email,
        address,
        kodePos,
        headmaster,
        nip_headmaster,
        logoUrl,
      } = req.body;

      const school = await prisma.school.create({
        data: {
          name,
          jenjang,
          npsn,
          nss,
          phoneNumber,
          email,
          address,
          kodePos,
          headmaster,
          nip_headmaster,
          logoUrl,
        },
      });

      res.status(201).json({
        message: "School created successfully",
        school,
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        // Prisma unique constraint failed (misalnya email sudah terdaftar)
        res.status(400).json({ error: "Email already exists" });
      } else {
        res.status(500).json({ error: "Failed to create school" });
      }
    }
  }

  // Update School
  static async updateSchool(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const {
        name,
        jenjang,
        npsn,
        nss,
        phoneNumber,
        email,
        address,
        kodePos,
        headmaster,
        nip_headmaster,
        logoUrl,
      } = req.body;

      const updatedSchool = await prisma.school.update({
        where: { id: Number(id) },
        data: {
          name,
          jenjang,
          npsn,
          nss,
          phoneNumber,
          email,
          address,
          kodePos,
          headmaster,
          nip_headmaster,
          logoUrl,
        },
      });

      res.json({
        message: "School updated successfully",
        updatedSchool,
      });
    } catch (error: any) {
      if (error.code === "P2025") {
        // record not found
        res.status(404).json({ error: "School not found" });
      } else if (error.code === "P2002") {
        res.status(400).json({ error: "Email already exists" });
      } else {
        res.status(500).json({ error: "Failed to update school" });
      }
    }
  }
}

import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const createProject = async (req: Request, res: Response) => {
  try {
    // Authentication check
    if (!req.session.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Basic input validation
    const name = req.body?.name;
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({ error: "Invalid project name" });
    }

    const project = await prisma.project.create({
      data: {
        name: name.trim(),
        ownerId: req.session.userId,
      },
      include: { tasks: true },
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("createProject error:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const projects = await prisma.project.findMany({
      where: { ownerId: req.session.userId },
      include: { tasks: true },
      orderBy: { createdAt: "desc" },
    });

    res.json(projects);
  } catch (error) {
    console.error("getProjects error:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

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

export const getProjectById = async (req: Request, res: Response) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { id } = req.params;
    const projectId = Number(id);

    const project = await prisma.project.findFirst({
      where: { id: projectId, ownerId: req.session.userId },
      include: { tasks: true },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error("getProjectById error:", error);
    res.status(500).json({ error: "Failed to fetch project" });
  }
};

export const deleteProjects = async (req: Request, res: Response) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const projectId = req.params.id;
    await prisma.project.delete({
      where: { id: projectId, ownerId: req.session.userId },
    });
    res.status(204).send();
  } catch (error) {
    console.error("deleteProjects error:", error);
    res.status(500).json({ error: "Failed to delete project" });
  }
};

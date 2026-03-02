import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const createTask = async (req: Request, res: Response) => {
  const { title, description, priority, dueDate } = req.body;

  const { id } = req.params;
  const projectId = Number(id);
  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const task = await prisma.task.create({
    data: {
      title,
      description,
      priority: priority.toUpperCase(),
      dueDate: new Date(dueDate),
      userId: req.session.userId,
      projectId: projectId,
    },
  });

  res.status(201).json(task);
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const tasks = await prisma.task.findMany({
      where: { userId: req.session.userId },
    });

    res.json(tasks);
  } catch (error) {
    console.error("getTasks error:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await prisma.task.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });

    res.json(task);
  } catch (error) {
    console.error("updateTask error:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  await prisma.task.delete({
    where: { id: Number(req.params.id) },
  });

  res.status(204).send();
};

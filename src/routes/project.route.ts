import { Router } from "express";
import { createProject, getProjects } from "../controller/project.controller";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { requireRole } from "../middleware/requireRole";

const router = Router();

router.use(isAuthenticated);
router.post("/", requireRole("admin"), createProject);
router.get("/", getProjects);

export default router;

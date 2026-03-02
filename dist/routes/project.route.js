import { Router } from "express";
import { createProject, getProjects, getProjectById, } from "../controller/project.controller";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { requireRole } from "../middleware/requireRole";
const router = Router();
router.use(isAuthenticated);
router.post("/", createProject);
router.get("/", getProjects);
router.get("/:id", getProjectById); // Use getProjectById to fetch a single project by ID
export default router;
//# sourceMappingURL=project.route.js.map
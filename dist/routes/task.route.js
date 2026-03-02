import { Router } from "express";
import { createTask, getTasks, updateTask, deleteTask, } from "../controller/task.controller";
import { isAuthenticated } from "../middleware/isAuthenticated";
const router = Router();
router.use(isAuthenticated);
router.post("/:id", createTask);
router.get("/", getTasks);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);
export default router;
//# sourceMappingURL=task.route.js.map
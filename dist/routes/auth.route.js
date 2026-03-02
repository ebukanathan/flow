import express from "express";
import { getAllUsers, createUser, loginUser, getDashboard, getUserProfile, logout, } from "../controller/auth.controller";
import { requireRole } from "../middleware/requireRole";
const router = express.Router();
// create a new user
router.post("/login", loginUser);
router.post("/register", createUser);
router.get("/users", getAllUsers);
router.get("/dashboard", requireRole("admin"), getDashboard);
router.get("/userprofile", getUserProfile);
router.post("/logout", logout);
export default router;
//# sourceMappingURL=auth.route.js.map
import "dotenv/config";
import express from "express";
import authRoutes from "./routes/auth.route";
import projectRoutes from "./routes/project.route";
import taskRoutes from "./routes/task.route";
import expressSession from "express-session";
import cors from "cors";
import { prisma } from "./lib/prisma";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import nodemailer from "nodemailer";

const app = express();

app.use(express.json());

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET!,
//     resave: false,
//     saveUninitialized: false,
//   }),
// );

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  }),
);

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: process.env.SESSION_SECRET!,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      // dbRecordIdFunction: undefined,
    }),
  }),
);

app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ebukanathan@gmail.com",
    pass: "Munadeb1922",
  },
});

export async function sendWelcomeEmail(email: String) {
  await transporter.sendMail({
    from: "ebukanathan@gmail.com",
    to: email,
    subject: "welcome message",
    text: "Thank you for signing up",
  });
}

export default app;

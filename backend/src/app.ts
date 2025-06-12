import express, { Request, Response } from "express";
import webhookStackAuth from "./api/webhooks/stack-auth";
import morgan from "morgan";
import helmet from "helmet";
import EquipmentRoute from "./routes/EquipmentRoute";
import cors from "cors";
import UserRoute from "./routes/Userroutes";

const app = express();
// Logging middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Replace '*' with the specific origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow credentials
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "x-csrf-token",
      "x-stack-auth",
      "AccessToken",
      "X-Refresh-Token",
    ],
    exposedHeaders: ["Authorization"],
  })
);
app.use(morgan("dev"));
// Middleware
app.use(helmet()); // Security middleware

// app.use(securityMiddleware);
app.use("/api/webhooks/stack-auth", webhookStackAuth);

app.use(express.json());

// Routes For Equipments
app.use("/api/v1/equipments", EquipmentRoute);

// Routes for users
app.use("/api/v1/user", UserRoute);




app.get("/", (req: Request, res: Response) => {
  res.send("Server is running on port 2000");
});

export default app;

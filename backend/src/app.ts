import express, { Request, Response } from "express";
import webhookStackAuth from "./api/webhooks/stack-auth";
import morgan from "morgan";
import helmet from "helmet";
import EquipmentRoute from "./routes/EquipmentRoute";
import cors from "cors";

const app = express();
// Logging middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
    exposedHeaders: ["*", "Authorization"]
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



app.get("/", (req: Request, res: Response) => {
  res.send("Server is running on port 4000");
});



export default app;

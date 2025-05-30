import express, { Request, Response } from "express";

// Import your routes and middleware here
// import userRoutes from "./routes/userRoutes";
// import securityMiddleware from "./middleware/security";

const app = express();

// Middleware
app.use(express.json());
// app.use(securityMiddleware);

// Routes
// app.use("/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running and database is connected!");
});

export default app;

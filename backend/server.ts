import express, { Request, Response } from "express";
import prisma, { testConnection } from "./src/config/database_Sql";


const app = express();
const PORT = process.env.PORT || 3000;

async function startServer() {
  await testConnection();



  app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
  });
}

// check adding the user 

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

// 

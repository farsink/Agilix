import prisma, { testConnection } from "./src/config/database_Sql";
import app from "./src/app";
import { connectMongoDB } from "./src/config/Mongodb";

const PORT = process.env.PORT || 4000;

async function startServer() {
  await testConnection();
  await connectMongoDB();

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

// check adding the user

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

//

import prisma, { testConnection } from "./src/config/database_Sql";
import app from "./src/app";
import { connectMongoDB } from "./src/config/Mongodb";


async function startServer() {
  await testConnection();
  await connectMongoDB();

  app.listen(4000, () => {
    console.log(`  Server listening on http://localhost:4000`);
  });
}

// check adding the user

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

//

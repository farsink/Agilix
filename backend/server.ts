import prisma, { testConnection } from "./src/config/database_Sql";
import app from "./src/app";
import { connectMongoDB } from "./src/config/Mongodb";
import http from "http";
import { Server } from "socket.io";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

async function startServer() {
  await testConnection();
  await connectMongoDB();

  const port = Number(process.env.PORT) || 5000;
  server.listen(port, "0.0.0.0", () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

// check adding the user

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

export { io };
//

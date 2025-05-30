import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

export async function testConnection(): Promise<void> {
  try {
    await prisma.$connect();
    console.log("✅ Connected to PostgreSQL via Prisma");
  } catch (error) {
    console.error("❌ Prisma connection error:", error);
    process.exit(1);
  }
}

// Optionally call testConnection() in your main entry point, not here.

export default prisma;

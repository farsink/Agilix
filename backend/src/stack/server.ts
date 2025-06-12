import { StackServerApp } from "@stackframe/js";
import dotenv from "dotenv";

dotenv.config();

export const stackServerApp = new StackServerApp({
  tokenStore: "memory",
  publishableClientKey: process.env.STACK_PUBLISHABLE_CLIENT_KEY,
  secretServerKey: process.env.STACK_SECRET_SERVER_KEY,
  projectId: process.env.STACK_PROJECT_ID,
});

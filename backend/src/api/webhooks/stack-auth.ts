import express, { Request, Response } from "express";
import rateLimit from "express-rate-limit";
import { PrismaClient } from "@prisma/client";
import { Webhook } from "svix";
import { json } from "stream/consumers";
import { createUserProfileIfNotExists } from "../../services/mongoUser.service";

const router = express.Router();
const prisma = new PrismaClient();

const webhookLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
interface StackAuthPayload {
  type: string;
  data: any; // You can define a more specific type for 'data' if needed
}

router.post(
  "/",
  express.json({
    verify: (req: Request, res: Response, buf: Buffer) => {
      // Save raw body buffer for verification
      (req as any).rawBody = buf;
    },
  }),
  async (req: Request, res: Response) => {
    console.log(process.env.SVIX_WEBHOOK_SIGNING_SECRET);

    const rawBody = (req as any).rawBody;
    const body = rawBody.toString();
    const headers = req.headers;

    console.log("Received webhook request:", {
      headers,
      body: body,
    });

    const wh = new Webhook(process.env.SVIX_WEBHOOK_SIGNING_SECRET as string);



    try {
      const payload = wh.verify(rawBody, {
        "svix-id": headers["svix-id"] as string,
        "svix-timestamp": headers["svix-timestamp"] as string,
        "svix-signature": headers["svix-signature"] as string,
      }) as StackAuthPayload;

      const { type, data } = payload;

      try {
        if (type === "user.created" || type === "user.updated") {
          const user = await prisma.user.upsert({
            where: { stackauthUserId: data.id },
            update: {
              email: data.primary_email,
              firstName: data.display_name?.split(" ")[0] || null,
              lastName:
                data.display_name?.split(" ").slice(1).join(" ") || null,
              profileData: data.server_metadata || {},
              isVerified: data.primary_email_verified,
            },
            create: {
              stackauthUserId: data.id,
              email: data.primary_email,
              firstName: data.display_name?.split(" ")[0] || null,
              lastName:
                data.display_name?.split(" ").slice(1).join(" ") || null,
              profileData: data.server_metadata || {},
              isVerified: data.primary_email_verified,
            },
          });

          await createUserProfileIfNotExists(user, data.id);

          console.log(
            `User ${data.id} ${type === "user.created" ? "created" : "updated"}`
          );
        } else if (type === "user.deleted") {
          await prisma.user.update({
            where: { stackauthUserId: data.id },
            data: { isActive: false },
          });

          console.log(`User ${data.id} deleted`);
        } else if (type === "user.logged_in") {
          await prisma.user.update({
            where: { stackauthUserId: data.id },
            data: { lastLoginAt: new Date() },
          });

          console.log(`User ${data.id} logged in`);
        } else {
          console.log(`Unhandled event type: ${type}`);
        }

        res.status(200).json({ success: true });
        return;
      } catch (error) {
        console.error("Error processing webhook:", error);
        res.status(200).json({ success: true, warning: "Processing error" });
      }
      return;
    } catch (err) {
      console.log("Webhook verification failed:", err);
      res.status(400).json({ success: false, warning: "Verification failed" });
    }
    return;
  }
);

export default router;

import { Request, Response, NextFunction } from "express";
import { User } from "@stackframe/stack";
import { stackServerApp } from "../stack/server";

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export class AuthMiddleware {
  private stackServerApp = stackServerApp;

  /**
   * Main authentication middleware
   */
  public authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {

      const accessToken = req.headers["accesstoken"] as string;
      const RefreshToken = req.headers["x-refresh-token"] as string;


      if (!accessToken) {
        res.status(401).json({
          success: false,
          error: "Authentication token missing",
          code: "MISSING_TOKEN",
        });
        return;
      }

      // 2. Validate token and get user
      const user = await this.validateToken(accessToken, RefreshToken);

      if (!user) {
        res.status(401).json({
          success: false,
          error: "Invalid authentication token",
          code: "INVALID_TOKEN",
        });
        return;
      }

      // 3. Check email verification
      if (!user.primaryEmailVerified) {
        res.status(403).json({
          success: false,
          error: "Email verification required",
          code: "EMAIL_NOT_VERIFIED",
        });
        return;
      }

      // 4. Attach user to request
      req.user = user;

      // 5. Proceed to route handler
      next();
    } catch (error) {
      this.handleError(error, res);
    }
  };

  /**
   * Token validation logic
   */
  private async validateToken(
    accessToken: string,
    refreshToken: string
  ): Promise<User | null> {
    try {
      return await this.stackServerApp.getUser({
        tokenStore: { accessToken: accessToken, refreshToken: refreshToken },
      });
    } catch (error) {
      console.error("Token validation failed:", error);
      return null;
    }
  }

  /**
   * Centralized error handler
   */
  private handleError(error: any, res: Response) {
    console.error("Authentication error:", error);

    // Generic error response in production
    const isDev = process.env.NODE_ENV === "development";

    res.status(500).json({
      success: false,
      error: "Authentication failed",
      code: "AUTHENTICATION_ERROR",
      details: isDev ? error.message : undefined,
    });
    return;
  }

  /**
   * Utility method for optional authentication
   */
  public optionalAuth = this.authenticateOptional.bind(this);

  private async authenticateOptional(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const accessToken = req.headers["AccessToken"] as string;
    const RefreshToken = req.headers["X-Refresh-Token"] as string;

    if (!accessToken) {
      next();
    }

    try {
      const user = await this.validateToken(accessToken, RefreshToken);

      if (user) {
        req.user = user;
      }

      next();
    } catch (error) {
      this.handleError(error, res);
    }
  }
}

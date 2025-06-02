import "server-only";

import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",

  // Add your app routes here
  urls: {
    afterSignIn: "/dashboard",
    signIn: "/dashboard",
  },
});

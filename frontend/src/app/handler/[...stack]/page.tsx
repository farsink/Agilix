import { StackHandler } from "@stackframe/stack";
import { stackServerApp } from "../../../stack";

export default function Handler(props: unknown) {
  return (
    <div style={{ backgroundColor: "#f0f0f0", minHeight: "100vh", padding: "20px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <StackHandler fullPage app={stackServerApp} routeProps={props} />
      </div>
    </div>)
};

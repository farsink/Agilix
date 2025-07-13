"use client";

import React, { ReactNode } from "react";
import BottomNavBar from "./components/Bottomnavbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  
  

  return (
    <>
      <main className="mx-auto max-w-lg">{children}</main>
      <BottomNavBar />
    </>
  );
}

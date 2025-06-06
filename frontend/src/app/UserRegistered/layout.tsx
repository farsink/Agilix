"use client";
import { ReactNode } from "react";
import Header from "../layout/Header";
import { Toaster } from "@/components/ui/toaster";

export default function UserRegisteredLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Header userRegister={true} />
      <main>{children}</main>
      <Toaster />
    </>
  );
}

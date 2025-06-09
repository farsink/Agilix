"use client";
import { ReactNode, useEffect, useState } from "react";
import Header from "../layout/Header";
import { Toaster } from "@/components/ui/toaster";
import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import TriangleLoader from "../Components/Loader";
import { IsRegistered } from "@/Services/api/User.api";
import { toast } from "@/hooks/use-toast";
type res = {
  success: boolean;
  message?: string;
  isRegistered?: boolean;
};
export default function UserRegisteredLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const userId = useUser()?.id;

  useEffect(() => {
    const isRegistered = async () => {
      try {
        const res: res = await IsRegistered(userId as string);

        console.log(res);

        if (res.success && res.isRegistered) {
        } else {
          toast({
            title: res.message,
            description: "Please try again later.",
            variant: "destructive",
          });
          setTimeout(() => {
            router.push("/");
          }, 3000);
        }
      } catch (error) {
        console.error("Error checking registration status:", error);
        toast({
          title: "Error checking registration status",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    };

    isRegistered();
  });
  if (loading) {
    return (
      <>
        <TriangleLoader />
        <Toaster />
      </>
    );
  }

  return (
    <>
      <Header userRegister={true} />
      <main>{children}</main>
      <Toaster />
    </>
  );
}

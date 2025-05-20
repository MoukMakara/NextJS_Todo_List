"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

const LoginOutButton = () => {
  return (
    <Button
      onClick={() => {
        toast.success("Log Out Successfully!");
        signOut({ callbackUrl: "http://localhost:3000/login" });
      }}
    >
      Logout
    </Button>
  );
};
export default LoginOutButton;

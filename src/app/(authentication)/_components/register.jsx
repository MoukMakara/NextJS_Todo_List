"use client";
import { registerUserAction } from "@/action/authAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema } from "@/lib/zon/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, Mail, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function RegisterComponent() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const handleRegisterUser = (userData) => {
    toast.promise(
      async () => {
        try {
          const res = await registerUserAction(userData);
          if (res?.status === "CONFLICT") {
            throw new Error(res.message);
          }
          router.push("/login");
          return res.message || "User registered successfully!";
        } catch (err) {
          throw err.message || "An unexpected error occurred";
        }
      },
      {
        loading: "Registering User...",
        success: (res) => `${res}`,
        error: (err) => `${err}`,
      }
    );

    reset();
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleRegisterUser)}>
      {/* username */}
      <div>
        <Label
          htmlFor="username"
          className="text-light-steel-blue flex gap-2 items-start mb-2 text-base"
        >
          <UserRound size={20} /> Username
        </Label>

        <Input
          type="text"
          placeholder="Please type your username"
          className={` bg-ghost-white py-2.5 px-4 mb-2 rounded-lg w-full text-light-steel-blue/90`}
          {...register("username")}
        />
        <span className="text-red-500 text-sm ">
          {errors?.username?.message}
        </span>
      </div>

      {/* email */}
      <div>
        <Label
          htmlFor="email"
          className="text-light-steel-blue flex gap-2 items-start mb-2  text-base"
        >
          <Mail size={20} /> Email
        </Label>

        <Input
          type="text"
          placeholder="Please type your email"
          className={`bg-ghost-white py-2.5 px-4 mb-2 rounded-lg w-full text-light-steel-blue/90`}
          {...register("email")}
        />
        <span className="text-red-500 text-sm ">{errors?.email?.message}</span>
      </div>

      {/* password */}
      <div>
        <Label
          htmlFor="password"
          className="text-light-steel-blue flex gap-2 items-start mb-2 text-base"
        >
          <KeyRound size={20} /> Password
        </Label>

        <Input
          type="password"
          placeholder="Please type your password"
          className={`bg-ghost-white py-2.5 px-4 mb-2 rounded-lg w-full text-light-steel-blue/90`}
          {...register("password")}
        />
        <span className="text-red-500 text-sm ">
          {errors?.password?.message}
        </span>
      </div>

      {/* sign in button */}
      <Button
        type="submit"
        className="text-base cursor-pointer bg-persian-green text-white py-2.5 rounded-lg w-full font-bold"
      >
        Sign Up{" "}
      </Button>

      {/* underline */}
      <div>
        <div className="border-b border-b-light-steel-blue"></div>
        <div className="text-right mt-2 font-normal">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="hover:text-persian-green hover:underline"
          >
            Login
          </Link>
        </div>
      </div>

      {/* sign in with google */}
      <div className=" bg-ghost-white rounded-lg text-center">
        <Button className="flex gap-2 items-start justify-center w-full bg-ghost-white text-charcoal shadow-none hover:bg-ghost-white/50">
          <img src="/Google Icon.svg" alt="google icon" /> Sign in with google
        </Button>
      </div>
    </form>
  );
}

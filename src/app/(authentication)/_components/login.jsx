"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/lib/zon/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function LoginComponent() {
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (userData) => {
    const res = await signIn("credentials", {
      redirect: false,
      ...userData,
    });

    if (res?.ok) {
      toast.success("Login Successfully!");

      router.push("/todo");
      reset();
    } else {
      toast.error("Email or Password is incorrect!");
    }
  };

  return (
    <form className="space-y-6 bg-white" onSubmit={handleSubmit(onSubmit)}>
      {/* email */}
      <div>
        <Label
          htmlFor="email"
          className="text-light-steel-blue flex gap-2 items-start mb-2 text-base"
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
        Login
      </Button>

      {/* underline */}
      <div>
        <div className="border-b border-b-light-steel-blue"></div>
        <div className="capitalize text-right mt-2 font-normal">
          create new accont?{" "}
          <Link
            href={"/register"}
            className="hover:text-persian-green hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* sign in with google */}
      {/* <div className=" bg-ghost-white rounded-lg text-center">

        <Button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/todo" })}
          className="flex gap-2 items-start justify-center w-full bg-ghost-white text-charcoal shadow-none hover:bg-gray-500 hover:text-white cursor-pointer"
        >
          <img src="/Google Icon.svg" alt="google icon" /> Login with google
        </Button>
      </div> */}
    </form>
  );
}

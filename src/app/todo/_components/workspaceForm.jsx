"use client";
import {
  createWorkspaceAction,
  updateWorkspaceNameByIdAction,
} from "@/action/workspaceAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { workspaceSchema } from "@/lib/zon/workspaceSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { ListPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const WorkspaceFormComponent = ({
  workspaceId,
  workspaceName,
  action,
  onClose,
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(workspaceSchema) });

  const onSubmit = (data) => {
    action === "UPDATE"
      ? toast.promise(
          updateWorkspaceNameByIdAction(workspaceId, data),

          {
            loading: "Updating Your Workspace...",
            success: "Your Workspace has been updated Successfully!",
            error: "There is an error updating your workspace...",
          }
        )
      : toast.promise(
          createWorkspaceAction(data),

          {
            loading: "Creating Your Workspace...",
            success: "Create Your Workspace Successfully!",
            error: "There is an error creating your workspace...",
          }
        );
    reset();
    onClose();
  };

  return (
    <form className=" flex flex-col bg-white" onSubmit={handleSubmit(onSubmit)}>
      {/* workspace's name */}
      <div className="mb-4">
        <Label
          htmlFor="email"
          className="text-light-steel-blue flex gap-2 py-2 items-center mb-2 text-base"
        >
          <ListPlus size={20} /> Workspace's Name
        </Label>

        <Input
          type="text"
          placeholder={
            action === "ADD" ? "Enter your workspace's name" : workspaceName
          }
          className={`bg-ghost-white py-2.5 px-4 rounded-lg mb-2 w-full text-light-steel-blue/90`}
          {...register("workspaceName")}
        />
        <span className="text-red-500 text-sm ">
          {errors?.workspaceName?.message}
        </span>
      </div>

      {/* sign in button */}
      <Button
        type="submit"
        className={`text-base cursor-pointer hover:text-white py-2.5 rounded-lg self-end font-bold ${
          action === "UPDATE"
            ? "hover:bg-persian-green bg-transparent text-persian-green  border-1 border-persian-green"
            : "hover:bg-royal-blue bg-transparent text-royal-blue  border-1 border-royal-blue"
        }`}
      >
        {action === "UPDATE" ? "Update" : "Create"}
      </Button>
    </form>
  );
};

export default WorkspaceFormComponent;

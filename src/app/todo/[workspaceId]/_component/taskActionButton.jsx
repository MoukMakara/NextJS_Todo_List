"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Grid2x2Plus } from "lucide-react";
import TaskFormComponent from "./taskForm";
import { useState, useEffect } from "react";
import Image from "next/image";

const TaskActionButtonComponent = ({ action, workspaceId, task }) => {
  const [isOpen, setIsOpen] = useState(!!action);


  useEffect(() => {
    setIsOpen(!!action);
  }, [action]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {action === "UPDATE" ? null : (
        <div className="flex gap-4 items-center">
          <DialogTrigger className={"cursor-pointer"}>
            <div className="flex gap-2 bg-blue-500 text-white px-4 py-2 rounded-full">
              <Grid2x2Plus className="size-6" />
              Add Task
            </div>
          </DialogTrigger>
          <div className="shadow-[0px_1px_39px_-6px_rgba(0,_0,_0,_0.3)] rounded-full  p-2">
            {" "}
            <Image
              width={24}
              height={24}
              src="/4 dots.svg"
              className="!bg-transparent "
              alt="4 dots"
            />
          </div>
        </div>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            {action === "UPDATE" ? "Update Task" : "Add Task"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
          <TaskFormComponent
            action={action}
            workspaceId={workspaceId}
           task={task}
            onClose={() => setIsOpen(false)}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TaskActionButtonComponent;

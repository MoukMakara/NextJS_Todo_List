"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { DatePickerWithPresets } from "./datetimePicker";
import { createTaskAction, updateTaskByIdAction } from "@/action/taskAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/lib/zon/taskSchema";
import SelectTagComponent from "./selectTag";
import toast from "react-hot-toast";

const TaskFormComponent = ({ action, workspaceId, task, onClose }) => {
  const {
    register,
    reset,
    trigger,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = async (data) => {
    const taskData = {
      ...data,
      endDate: new Date(data.endDate).toISOString(),
    };
    action === "UPDATE"
      ? toast.promise(
          updateTaskByIdAction(task.taskId, workspaceId, taskData),
          {
            success: "Your task has been updated successfully!",
            loading: "Updating your task....",
            error: "Unable to update your task!",
          }
        )
      : toast.promise(createTaskAction(taskData, workspaceId), {
          success: "Your task has been created successfully!",
          loading: "Creating your task....",
          error: "Unable to create your task!",
        });
    onClose();
    reset();
  };

  return (
    <form className=" flex flex-col bg-white" onSubmit={handleSubmit(onSubmit)}>
      {/* task's title */}
      <div>
        <Label
          htmlFor="taskTitle"
          className="text-light-steel-blue flex gap-2 py-2 items-center mb-2 text-base"
        >
          Task's title
        </Label>

        <Input
          type="text"
          placeholder={
            action !== "UPDATE" ? "Enter your task's title" : task.taskTitle
          }
          className={`bg-ghost-white py-2.5 px-4 rounded-lg mb-2 w-full text-light-steel-blue/90`}
          {...register("taskTitle")}
        />
        <span className="text-red-500 text-sm ">
          {errors?.taskTitle?.message}
        </span>
      </div>

      {/* task's detials */}
      <div>
        <Label
          htmlFor="taskDetails"
          className="text-light-steel-blue flex gap-2 py-2 items-center mb-2 text-base"
        >
          Task's Detail
        </Label>

        <Input
          type="text"
          placeholder={
            action !== "UPDATE" ? "Enter your task's details" : task.taskDetails
          }
          className={`bg-ghost-white py-2.5 px-4 rounded-lg w-full mb-2 text-light-steel-blue/90`}
          {...register("taskDetails")}
        />
        <span className="text-red-500 text-sm">
          {errors?.taskDetails?.message}
        </span>
      </div>

      {/* task's tag */}
      <div className="mb-2">
        <Label
          htmlFor="taskTags"
          className="text-light-steel-blue flex gap-2 py-2 items-center mb-2 text-base"
        >
          Tag
        </Label>
        <SelectTagComponent
          action={action}
          task={task}
          setValue={setValue}
          trigger={trigger}
        />
        <p className="text-red-500 text-sm mt-3">{errors?.tag?.message}</p>
      </div>

      {/* task's date */}
      <div className="mb-2">
        <Label
          htmlFor="endDate"
          className="text-light-steel-blue flex gap-2 py-2 items-center mb-2 text-base"
        >
          Task's end date
        </Label>

        <DatePickerWithPresets
          action={action}
          task={task}
          setValue={setValue}
          trigger={trigger}
        />
        <p className="text-red-500 text-sm mt-3">{errors?.endDate?.message}</p>
      </div>

      <Button
        type="submit"
        className={`text-base cursor-pointer hover:text-white py-2.5 rounded-lg self-end  mt-2 ${
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

export default TaskFormComponent;

"use client";
import { updateTaskStatusAction } from "@/action/taskAction";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock } from "lucide-react";
import React from "react";

import { format, isTomorrow } from "date-fns";
import { DropdownMenuComponent } from "@/app/todo/[workspaceId]/_component/dropdownMenus";
import toast from "react-hot-toast";
export default function CardComponent({ tasks, workspaceId }) {
  const updateTaskStatus = async (taskId, taskStatus) => {
    toast.promise(updateTaskStatusAction(taskId, workspaceId, taskStatus), {
      success: "Your task's status has been updated successfully!",
      loading: "Updating your task's status....",
      error: "Unable to update your task' status!",
    });
  };

  function formatDate(date) {
    const parsedDate = new Date(date);
    const currentDate = new Date();
    if (isTomorrow(parsedDate)) {
      return "Tomorrow";
    }
    if (
      parsedDate > new Date().getDate() + 7 &&
      parsedDate < new Date().getDate() + 30
    ) {
      const weeks = Math.round(
        parsedDate.getDate() - currentDate.getDate() / 7
      );

      return weeks + " week(s) Left";
    }

    return format(parsedDate, "MMM dd, yyyy");
  }

  const selectValue = [
    {
      key: "NOT_STARTED",
      value: "Not Started",
    },
    {
      key: "IN_PROGRESS",
      value: "In Progess",
    },
    { key: "FINISHED", value: "Finished" },
  ];

  return (
    <>
      {tasks?.map((data) => (
        <div
          className="border border-gray-300 rounded-xl mt-6"
          key={data.taskId}
        >
          <div className="p-5">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold capitalize">{data.taskTitle}</h2>
              <DropdownMenuComponent task={data} workspaceId={workspaceId} />
            </div>

            {/* task detials */}
            <p className="line-clamp-2 text-light-steel-blue my-2 h-12">
              {data.taskDetails}
            </p>

            <div className="flex justify-between items-center mt-4">
              {/* tag */}
              <p className="bg-purple-100 text-purple-500 py-1.5 px-3 rounded-lg">
                {data.tag}
              </p>

              {/* status */}
              <div
                className={`rounded-full w-8 h-8  ${
                  data.status === "NOT_STARTED"
                    ? " bg-status-not-started"
                    : data.status === "IN_PROGRESS"
                    ? "bg-status-in-progress"
                    : "bg-status-finished"
                }`}
              ></div>
            </div>
          </div>

          {/* progress */}
          <div className="flex justify-between items-center border-t border-t-gray-300 p-5">
            <Select
              onValueChange={(value) => updateTaskStatus(data.taskId, value)}
            >
              <SelectTrigger
                className={`w-36 truncate  data-[placeholder]:text-sm   ${
                  data.status === "NOT_STARTED"
                    ? "data-[placeholder]:text-status-not-started border-status-not-started"
                    : data.status === "IN_PROGRESS"
                    ? "data-[placeholder]:text-status-in-progress border-status-in-progress"
                    : "data-[placeholder]:text-status-finished border-status-finished"
                }`}
              >
                <SelectValue
                  placeholder={
                    data.status === "NOT_STARTED"
                      ? "Not Started"
                      : data.status === "FINISHED"
                      ? "Finished"
                      : "In Progress"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {selectValue.map((data, index) => (
                  <SelectItem
                    key={index}
                    value={data.key}
                    className={`  ${
                      data.key === "NOT_STARTED"
                        ? "text-status-not-started hover:!text-status-not-started "
                        : data.key === "IN_PROGRESS"
                        ? "text-status-in-progress hover:!text-status-in-progress"
                        : "text-status-finished hover:!text-status-finished"
                    }`}
                  >
                    {data.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* date */}
            <p className="flex gap-3 text-light-steel-blue">
              <Clock size={22} /> {formatDate(data.endDate)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Ellipsis, Grid2x2Plus } from "lucide-react";
import WorkspaceFormComponent from "./workspaceForm";
import { useState } from "react";

const PopupFormComponent = ({ workspaceId, workspaceName, action }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="cursor-pointer p-1.5 rounded-sm">
        {action === "UPDATE" ? (
          <Ellipsis className={"size-5"} />
        ) : (
          <Grid2x2Plus className={"size-6"} />
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={"text-center"}>
            {action === "UPDATE" ? "Update Workspace" : "Add Workspace"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
          <WorkspaceFormComponent
            workspaceId={workspaceId}
            workspaceName={workspaceName}
            action={action}
            onClose={() => setIsOpen(false)}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PopupFormComponent;

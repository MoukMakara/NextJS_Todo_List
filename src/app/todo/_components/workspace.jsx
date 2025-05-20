import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Circle } from "lucide-react";
import PopupFormComponent from "./popupForm";
import Link from "next/link";

export const Workspace = ({ workspace }) => {
  return (
    <>
      <SidebarGroup
        className={
          "flex-row justify-between items-center !text-description pr-3.5 "
        }
      >
        <SidebarGroupLabel className={"font-bold text-2xl !text-description"}>
          Workspace
        </SidebarGroupLabel>
        <PopupFormComponent action={"ADD"} />
      </SidebarGroup>

      <SidebarGroup className={"h-[250px] overflow-auto"}>
        <SidebarMenu>
          {workspace?.map((data) => (
            <SidebarMenuItem
              key={data.workspaceId}
              className={
                "flex justify-between relative items-center py-1 hover:bg-zinc-200 rounded-md px-2"
              }
            >
              <Link
                href={`/todo/${data.workspaceId}?q=workspace`}
                className="w-full"
              >
                <div className="flex gap-4 items-center justify-start">
                  <Circle stroke={data.color} fill={data.color} size={12} />
                  {/* <SidebarMenuButton className={"flex justify-between"}> */}

                  <span>{data.workspaceName}</span>
                </div>
              </Link>
              <div className="absolute right-5">
                {" "}
                <PopupFormComponent
                  workspaceId={data.workspaceId}
                  workspaceName={data.workspaceName}
                  action={"UPDATE"}
                />
              </div>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
};

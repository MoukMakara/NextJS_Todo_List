import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "../../../components/ui/sidebar";
import { Circle, Star } from "lucide-react";
import Link from "next/link";
import PopupFormComponent from "./popupForm";

export const FavoriteWorkspace = ({ workspace }) => {
  return (
    <>
      <SidebarGroup
        className={"flex-row justify-between items-center !text-description"}
      >
        <SidebarGroupLabel className={"font-bold text-xl !text-description"}>
          Favorite
        </SidebarGroupLabel>
        <Star className={"size-6 mr-3"} />
      </SidebarGroup>

      <SidebarGroup className={"h-[250px] overflow-auto"}>
        <SidebarMenu>
          {workspace
            ?.filter((data) => data.isFavorite)
            ?.map((data) => (
              <SidebarMenuItem
                key={data.workspaceId}
                className={
                  "flex justify-between  items-center py-1 hover:bg-zinc-200 rounded-md px-2 relative"
                }
              >
                {" "}
                <Link
                  href={`/todo/${data.workspaceId}?q=workspace`}
                  className="w-full"
                >
                  <div className="flex gap-4  items-center justify-start">
                    <Circle stroke={data.color} fill={data.color} size={12} />

                    <span>{data.workspaceName}</span>
                  </div>
                </Link>
                <div className="absolute right-5">
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

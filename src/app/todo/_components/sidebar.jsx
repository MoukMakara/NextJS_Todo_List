import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "../../../components/logo";
import { Workspace } from "./workspace";
import { FavoriteWorkspace } from "./favWorkspace";
import { getAllWorkspacesAction } from "@/action/workspaceAction";
import LoginOutButton from "./logoutButton";

export async function AppSidebar() {
  const payload = await getAllWorkspacesAction();

  const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
  };
  const workspace = payload?.map((data) => ({
    ...data,
    color: getRandomColor(),
  }));
  return (
    <Sidebar>
      <SidebarHeader className={"items-center justify-center pt-8"}>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <Workspace workspace={workspace} />

        <FavoriteWorkspace workspace={workspace} />
      </SidebarContent>
      <SidebarFooter>
        <LoginOutButton />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

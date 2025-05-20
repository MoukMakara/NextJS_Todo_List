import { AppSidebar } from "@/app/todo/_components/sidebar";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-select";
import UserBadgeComponent from "./_components/userBadge";
import BreadcrumbWrapper from "./_components/breadcrumbWrapper";

export default function MainLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* <header className=> */}
        <nav className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b">
          <div className="flex items-center justify-between px-4 w-full">
            <div className="flex gap-2 items-center">
              <SidebarTrigger className="-ml-1 pb-2" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <BreadcrumbWrapper />
            </div>
            <div className="self-end">
              <UserBadgeComponent />
            </div>
          </div>
        </nav>
        {/* </header> */}
        <main className="px-16">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

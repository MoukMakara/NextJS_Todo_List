"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

const BreadcrumbComponent = ({ workspace }) => {
  const path = usePathname();
  const getWorkspaceName = () => {
    if (path.substring(6)) {
      const data = workspace.filter(
        (data) => data.workspaceId === path.substring(6)
      );
      return data[0].workspaceName;
    }
    return "Home";
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block text-xl  pb-2">
          <BreadcrumbPage>Workspace</BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block  pb-2" />
        <BreadcrumbItem className={"border-b border-breadcrumb pb-2  "}>
          <BreadcrumbPage className={"text-breadcrumb  text-xl"}>
            {getWorkspaceName()}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
export default BreadcrumbComponent;

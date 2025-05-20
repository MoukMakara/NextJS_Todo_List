import { getAllWorkspacesAction } from "@/action/workspaceAction";
import BreadcrumbComponent from "./breadcrumb";

const BreadcrumbWrapper = async () => {
  const workspace = await getAllWorkspacesAction();

  return <BreadcrumbComponent workspace={workspace} />;
};
export default BreadcrumbWrapper;

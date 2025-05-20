import { getWorkspaceByIdAction } from "@/action/workspaceAction";
import FavoriteButtonComponent from "./favoriteButtonComponent";

const WorkspaceHeader = async ({ workspaceId }) => {
  const workspaceData = await getWorkspaceByIdAction(workspaceId);
  return (
    <section className="flex justify-between  py-6">
      <h2 className="text-3xl font-bold">{workspaceData.workspaceName}</h2>
      <FavoriteButtonComponent
        workspaceId={workspaceData.workspaceId}
        state={workspaceData.isFavorite}
      />
    </section>
  );
};
export default WorkspaceHeader;

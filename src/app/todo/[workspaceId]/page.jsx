import WorkspaceHeader from "../_components/workspaceHeader";
import CardContainer from "./_component/cardContainer";
import TaskActionButtonComponent from "./_component/taskActionButton";

const WorkspaceContentPage = async ({ params }) => {
  const path = await params;

  return (
    <section className="relative">
      <WorkspaceHeader workspaceId={path.workspaceId} />
      <CardContainer workspaceId={path.workspaceId} />
      <div className="fixed z-50 bottom-10 right-30">
        <TaskActionButtonComponent workspaceId={path.workspaceId} />
      </div>
    </section>
  );
};

export default WorkspaceContentPage;

import { getAllTaskbyWorkspaceIdAction } from "@/action/taskAction";
import CardComponent from "@/components/card";
import EmptyTaskPlaceHolderComponent from "./emptyTaskPlaceHolder";

const CardContainer = async ({ workspaceId }) => {
  const data = await getAllTaskbyWorkspaceIdAction(workspaceId);
  const { payload } = data;

  const divideCardProgression = () => {
    return {
      notStarted: payload.filter((task) => task.status === "NOT_STARTED"),
      inProgress: payload.filter((task) => task.status === "IN_PROGRESS"),
      finished: payload.filter((task) => task.status === "FINISHED"),
    };
  };

  const { notStarted, inProgress, finished } = divideCardProgression();

  if (payload.length > 0) {
    return (
      <section className="grid grid-cols-3 gap-12 h-[580px] overflow-auto">
        {/* Not started */}
        <div>
          <p className="font-medium text-lg border-b pb-2 border-b-status-not-started text-status-not-started">
            Not Started
          </p>
          {notStarted.length > 0 ? (
            <CardComponent tasks={notStarted} workspaceId={workspaceId} />
          ) : (
            <p className="text-gray-500 mt-4">No tasks</p>
          )}
        </div>

        {/* In progress */}
        <div>
          <p className="font-medium text-lg border-b pb-2 border-b-status-in-progress text-status-in-progress">
            In Progress
          </p>
          {inProgress.length > 0 ? (
            <CardComponent tasks={inProgress} workspaceId={workspaceId} />
          ) : (
            <p className="text-gray-500 mt-4">No tasks</p>
          )}
        </div>

        {/* Finished */}
        <div>
          <p className="font-medium text-lg border-b pb-2 border-b-status-finished text-status-finished">
            Finished
          </p>
          {finished.length > 0 ? (
            <CardComponent tasks={finished} workspaceId={workspaceId} />
          ) : (
            <p className="text-gray-500 mt-4">No tasks</p>
          )}
        </div>
      </section>
    );
  } else {
    return <EmptyTaskPlaceHolderComponent />;
  }
};

export default CardContainer;

"use server";

import {
  createNewWorkspaceService,
  getAllWorkspacesService,
  getWorkspaceByIdService,
  updateWorkspaceByIdService,
  updateWorkspaceFavoriteByIdService,
} from "@/service/workspace.service";
import { revalidateTag } from "next/cache";

export const getAllWorkspacesAction = async () => {
  const workspaceList = await getAllWorkspacesService();
  const { payload } = workspaceList;
  return payload;
};

export const createWorkspaceAction = async (data) => {
  const res = await createNewWorkspaceService(data);
  revalidateTag("newWorkspace");


  return res;
};

export const getWorkspaceByIdAction = async (workspaceId) => {
  const workspace = await getWorkspaceByIdService(workspaceId);
  const { payload } = workspace;
  return payload;
};

export const updateWorkspaceFavStateByIdAction = async (workspaceId, state) => {
  const workspace = await updateWorkspaceFavoriteByIdService(
    workspaceId,
    state
  );
  const { payload } = workspace;
  revalidateTag("updateStateWorkspace");
  return payload;
};

export const updateWorkspaceNameByIdAction = async (
  workspaceId,
  newWorkspaceName
) => {
  const res = await updateWorkspaceByIdService(workspaceId, newWorkspaceName);
  revalidateTag("newWorkspace");
  return res;
};

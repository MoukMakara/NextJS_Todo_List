import headerToken from "@/app/api/headerToken";
import { baseUrl } from "./constant";

// Helper function to check response status
const handleResponse = async (res) => {
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(`Error ${res.status}: ${errorMessage}`);
  }
  return res.json();
};

export const getWorkspaceByIdService = async (id) => {
  const headers = await headerToken();
  try {
    const res = await fetch(`${baseUrl}/workspace/${id}`, {
      method: "GET",
      headers: headers,
    });
    return await handleResponse(res);
  } catch (error) {
    return { error: error.message };
  }
};

export const updateWorkspaceByIdService = async (id, workspaceData) => {
  try {
    const headers = await headerToken();
    const res = await fetch(`${baseUrl}/workspace/${id}`, {
      method: "PUT",
      body: JSON.stringify(workspaceData),
      headers: headers,
    });
    return await handleResponse(res);
  } catch (error) {
    return { error: error.message };
  }
};

export const createNewWorkspaceService = async (workspace) => {
  const headers = await headerToken();
  try {
    const res = await fetch(`${baseUrl}/workspace`, {
      method: "POST",
      body: JSON.stringify(workspace),
      headers: headers,
      next: { tags: ["newWorkspace"] },
    });
    return await handleResponse(res);
  } catch (error) {
    return { error: error.message };
  }
};

export const updateWorkspaceFavoriteByIdService = async (id, favState) => {
  const headers = await headerToken();
  try {
    const res = await fetch(
      `${baseUrl}/workspace/${id}/favorite?favorite=${favState}`,
      {
        method: "PATCH",
        headers: headers,
      }
    );
    return await handleResponse(res);
  } catch (error) {
    return { error: error.message };
  }
};

export const getAllWorkspacesService = async () => {
  const headers = await headerToken();
  try {
    const res = await fetch(
      `${baseUrl}/workspaces?pageNo=0&pageSize=100&sortBy=workspaceId&sortDirection=ASC`,
      {
        method: "GET",
        headers: headers,
        next: { tags: ["updateStateWorkspace"] },
      }
    );
    return await handleResponse(res);
  } catch (error) {
    return { error: error.message };
  }
};

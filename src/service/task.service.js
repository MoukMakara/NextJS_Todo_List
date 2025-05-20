import headerToken from "@/app/api/headerToken";
import { baseUrl } from "./constant";

// General function to handle API responses
const handleResponse = async (res) => {
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(`Error ${res.status}: ${errorMessage}`);
  }
  return await res.json();
};

// Fetch a task by taskId and workspaceId
export const getTaskByIdFromWorkspaceIdService = async (
  taskId,
  workspaceId
) => {
  try {
    const res = await fetch(
      `${baseUrl}/task/${taskId}/workspace/${workspaceId}`
    );
    return await handleResponse(res);
  } catch (error) {
    return { error: error.message };
  }
};

// Update a task by taskId and workspaceId
export const updateTaskByIdFromWorkspaceIdService = async (
  taskId,
  workspaceId,
  taskInfo
) => {
  try {
    const headers = await headerToken();
    const res = await fetch(
      `${baseUrl}/task/${taskId}/workspace/${workspaceId}`,
      {
        method: "PUT",
        body: JSON.stringify(taskInfo),
        headers: headers,
      }
    );
    return await handleResponse(res);
  } catch (error) {
    return { error: error.message };
  }
};

// Delete a task by taskId and workspaceId
export const deleteTaskByIdFromWorkspaceIdService = async (
  taskId,
  workspaceId
) => {
  try {
    const headers = await headerToken();
    const res = await fetch(
      `${baseUrl}/task/${taskId}/workspace/${workspaceId}`,
      {
        method: "DELETE",
        headers: headers,
      }
    );
    return await handleResponse(res);
  } catch (error) {
    return { error: error.message };
  }
};

// Create a new task in a workspace
export const createTaskFromWorkspaceIdService = async (
  taskInfo,
  workspaceId
) => {
  try {
    const headers = await headerToken();
    const res = await fetch(`${baseUrl}/task/workspace/${workspaceId}`, {
      method: "POST",
      body: JSON.stringify(taskInfo),
      headers: headers,
    });
    return await handleResponse(res);
  } catch (error) {
    return { error: error.message };
  }
};

// Update task status by taskId and workspaceId
export const updateTaskStatusByIdFromWorkspaceIdService = async (
  taskId,
  workspaceId,
  taskStatus
) => {
  try {
    const headers = await headerToken();
    const res = await fetch(
      `${baseUrl}/task/${taskId}/workspace/${workspaceId}/status?status=${taskStatus}`,
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

// Fetch all tasks in a workspace
export const getAllTasksFromWorkspaceIdService = async (workspaceId) => {
  try {
    const headers = await headerToken();
    const res = await fetch(
      `${baseUrl}/tasks/workspace/${workspaceId}?pageNo=0&pageSize=100&sortBy=taskId&sortDirection=ASC`,
      {
        method: "GET",
        headers: headers,
        next: { tags: ["getAllTasks"] },
      }
    );
    return await handleResponse(res);
  } catch (error) {
    return { error: error.message };
  }
};

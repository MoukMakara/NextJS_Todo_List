import { baseUrl } from "./constant";

// General function to handle API responses
const handleResponse = async (res) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => null); // Try parsing error response
    const errorMessage =
      errorData?.message || `Error ${res.status}: ${res.statusText}`;
    throw new Error(errorMessage);
  }
  return await res.json();
};

// Register a new user
export const registerUserService = async (userData) => {
  try {
    const res = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
    });
    return await handleResponse(res);
  } catch (error) {
    return { error: error.message };
  }
};

// Login user
export const loginService = async (loginData) => {
  try {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
    });
    return await handleResponse(res);
  } catch (error) {
    return { error: error.message };
  }
};

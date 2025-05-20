import headerToken from "@/app/api/headerToken";
import { baseUrl } from "./constant";

const handleResponse = async (res) => {
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(`Error ${res.status}: ${errorMessage}`);
  }
  return res.json();
};

export const getAllUserInfoService = async () => {
  const headers = await headerToken();
  try {
    const res = await fetch(`${baseUrl}/user`, {
      method: "GET",
      headers: headers,
    });
    return await handleResponse(res);
  } catch (error) {
    return { error: error.message };
  }
};

"use server";
const { registerUserService } = require("@/service/auth.service");

export const registerUserAction = async (userData) => {
  try {
  const res=  await registerUserService(userData);

    return { status: res?.status, message: res?.message };
  } catch (error) {
    return { status: res?.status, message: res?.message };
  }
};

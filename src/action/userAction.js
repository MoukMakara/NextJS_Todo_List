"use server";

import { getAllUserInfoService } from "@/service/user.service";
import { getServerSession } from "next-auth";

export const getAllUserInformationAction = async () => {
  const data = await getAllUserInfoService();
  const userSession = await getServerSession();

  let result = null;

  if (data && data.payload) {
    const { payload } = data;
    result = payload;
  } else if (userSession && userSession.user) {
    const { user } = userSession;
    result = user;
  }

  return result;
};

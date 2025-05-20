import { getAllUserInformationAction } from "@/action/userAction";
import { Grid2X2Plus } from "lucide-react";

import Image from "next/image";

const TodoPage = async () => {
  const userData = await getAllUserInformationAction();
  return (
    <div className="w-[500px] mx-auto flex mt-32 flex-col items-center border-1 text-center p-6 rounded-md">
      <p className="font-bold text-2xl">
        Welcome{" "}
        <span className="text-green-500">
          {userData.username || userData.name}
        </span>
        !
      </p>

      <p className="text-description ">
        Please choose or create a workspace to show data here!
      </p>

      <div className=" relative h-[300px] w-[200px]">
        <Image
          fill
          src={"/hello_shin_chang.jpg"}
          className="object-cover"
          alt="shin chang hello"
        />
      </div>
    </div>
  );
};
export default TodoPage;

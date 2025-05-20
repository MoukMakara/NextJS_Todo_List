"use client";

import { updateWorkspaceFavStateByIdAction } from "@/action/workspaceAction";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const FavoriteButtonComponent = ({ workspaceId, state }) => {
  const onClickFav = async () => {
    const res = await updateWorkspaceFavStateByIdAction(workspaceId, !state);
  };

  return (
    <Button
      variant={"ghost"}
      size={"lg"}
      className={"!bg-gray-400/20 hover:!bg-gray-400/40"}
      onClick={onClickFav}
    >
      {state ? (
        <Star
          className="size-[32px]"
          color={"#292D32"}
          fill="#fff220"
          strokeWidth={1.5}
        />
      ) : (
        <Star className="size-[32px]" color={"#292D32"} strokeWidth={1.5} />
      )}
    </Button>
  );
};

export default FavoriteButtonComponent;

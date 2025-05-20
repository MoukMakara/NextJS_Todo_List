import Image from "next/image";

const EmptyTaskPlaceHolderComponent = () => {
  return (
    <div className="w-[500px] mx-auto flex mt-10 flex-col items-center border-1 text-center p-6 rounded-md gap-2">
      <p className="font-bold text-2xl">
        Oops! I think your workspace is empty!
      </p>
      <p className="text-description">
        Create your first task to show it here!
      </p>
      <div className=" relative h-[300px] w-[300px]">
        <Image
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={"/chin_chang_sad.jpg"}
          className="object-cover"
          alt="shin chang sad"
        />
      </div>
    </div>
  );
};
export default EmptyTaskPlaceHolderComponent;

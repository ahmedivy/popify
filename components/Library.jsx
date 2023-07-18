"use client";

import { toast } from "react-hot-toast";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import { useUser } from "@/hooks/useUser";
import useAuthModel from "@/hooks/useAuthModel";
import useUploadModel from "@/hooks/useUploadModel";
import MediaItem from "./MediaItem";

function Library({ songs }) {
  const authModel = useAuthModel();
  const uploadModel = useUploadModel();

  const { user } = useUser();

  const onClick = () => {
    if (!user) {
      toast.error("Kindly login to add songs to your library!");
      authModel.onOpen();
      return;
    }

    uploadModel.onOpen();
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist size={26} className="text-neutral-400" />
          <p className="text-neutral-400 font-medium text-md">Your Library</p>
        </div>
        <AiOutlinePlus
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
          onClick={onClick}
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map((song) => (
          <MediaItem key={song.id} data={song} onClick={() => {}}/>
        ))}
      </div>
    </div>
  );
}

export default Library;

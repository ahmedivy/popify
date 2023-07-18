"use client";

import usePlayer from "@/hooks/usePlayer";
import useSongUrl from "@/hooks/useSongUrl";
import useGetSong from "@/hooks/useGetSong";
import PlayerContent from "./PlayerContent";

function Player() {
  const player = usePlayer();
  const { song } = useGetSong(player.activeId);
  const songUrl = useSongUrl(song);

  if (!song || !songUrl || !player.activeId) return null;

  return (
    <div className="fixed bottom-0 w-full py-2 bg-black h-[80px] px-4">
      <PlayerContent song={song} songUrl={songUrl} key={songUrl}/>
    </div>
  );
}

export default Player;

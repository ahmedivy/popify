import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import { useEffect, useState } from "react";
import useSound from "use-sound";

function PlayerContent({ song, songUrl }) {
  const player = usePlayer();

  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) return;

    const current = player.ids.indexOf(player.activeId);
    const next = current + 1 === player.ids.length ? 0 : current + 1;
    player.setId(player.ids[next]);
  };

  const onPlayPrev = () => {
    if (player.ids.length === 0) return;

    const current = player.ids.indexOf(player.activeId);
    const prev = current - 1 === -1 ? player.ids.length - 1 : current - 1;
    player.setId(player.ids[prev]);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div className="flex md:hidden col:auto w-full justify-end items-center">
        <div
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
          onClick={handlePlay}
        >
          <Icon className="text-black" size={30} />
        </div>
      </div>
      <div className="hiddem md:flex justify-center items-center h-full w-full max-w-[722px] gap-x-6">
        <AiFillStepBackward
          onClick={onPlayPrev}
          className="text-neutral-400 hover:text-white cursor-pointer transition"
          size={30}
        />
        <div
          onClick={handlePlay}
          className="flex items-center justify-center rounded-full bg-white p-1 cursor-pointer h-10 w-10"
        >
          <Icon className="text-black" size={30} />
        </div>
        <AiFillStepForward
          onClick={onPlayNext}
          className="text-neutral-400 hover:text-white cursor-pointer transition"
          size={30}
        />
      </div>
      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="text-neutral-400 hover:text-white cursor-pointer transition"
            size={34}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
}

export default PlayerContent;

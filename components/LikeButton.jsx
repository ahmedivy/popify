"use client";

import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAuthModel from "@/hooks/useAuthModel";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSessionContext } from "@supabase/auth-helpers-react";

function LikeButton({ songId }) {
  const router = useRouter();
  const authModel = useAuthModel();
  const { supabaseClient: supabase } = useSessionContext();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    const fetchData = async () => {
      const { data, error } = await supabase
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };
    fetchData();
  }, [songId, supabase, user?.id]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!user) {
      return authModel.onOpen();
    }

    if (isLiked) {
      const { error } = await supabase
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);

      if (error) {
        toast.error("Cannot unlike this song");
      } else {
        setIsLiked(false);
        toast.success("Unliked");
      }
    } else {
      const { error } = await supabase.from("liked_songs").insert([
        {
          user_id: user.id,
          song_id: songId,
        },
      ]);

      if (error) {
        toast.error("Cannot like this song");
      } else {
        setIsLiked(true);
        toast.success("Liked");
      }
    }
  };

  return (
    <button className="hover:opacity-75 transition" onClick={handleLike}>
      <Icon color={isLiked ? "red" : "white"} size={25} />
    </button>
  );
}

export default LikeButton;

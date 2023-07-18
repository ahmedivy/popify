import toast from "react-hot-toast";
import { useMemo, useState, useEffect } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";

const useGetSong = (id) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    
    const fetchSong = async () => {
      const { data: song, error } = await supabaseClient
        .from("songs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setIsLoading(false);
        toast.error(error.message);
        return;
      }

      setSong(song);
      setIsLoading(false);
    };

    fetchSong();
  }, [id, supabaseClient]);

  return useMemo(() => ({ isLoading, song }), [isLoading, song]);
};

export default useGetSong;
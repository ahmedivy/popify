const { useSupabaseClient } = require("@supabase/auth-helpers-react");

const useSongUrl = (song) => {
  const supabaseClient = useSupabaseClient();
  if (!song) return '';

  const { data, error } = supabaseClient.storage
    .from("songs")
    .getPublicUrl(song.song_path);

  if (error) {
    toast.error(error.message);
    return;
  }

  return data.publicUrl;
};

export default useSongUrl;
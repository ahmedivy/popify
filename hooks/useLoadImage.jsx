import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadImage = (imagePath) => {
  const supabase = useSupabaseClient();

  if (!imagePath) {
    return null;
  }

  const { data, error } = supabase.storage
    .from("images")
    .getPublicUrl(imagePath);

  if (error) {
    console.log(error);
    return null;
  }

  return data.publicUrl;
};

export default useLoadImage;

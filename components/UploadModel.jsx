"use client";

import uniqid from "uniqid";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Model from "./Model";
import Input from "./Input";
import useUploadModel from "@/hooks/useUploadModel";
import Button from "./Button";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

function UploadModel() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const uploadModel = useUploadModel();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onChange = (open) => {
    if (!open) {
      reset();

      uploadModel.onClose();
    }
  };

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image[0];
      const songFile = values.song[0];

      if (!imageFile || !songFile) {
        toast.error("Please select both image and song file!");
        return;
      }

      if (!user) {
        toast.error("Kindly login to upload songs!");
        return;
      }

      const uniqueId = uniqid();

      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`images-${values.title}-${uniqueId}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        toast.error("Something went wrong, please try again!");
        return;
      }

      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`songs-${values.title}-${uniqueId}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        toast.error("Something went wrong, please try again!");
        return;
      }

      const { error: insertError } = await supabaseClient.from("songs").insert({
        user_id: user.id,
        title: values.title,
        author: values.author,
        image_path: imageData.path,
        song_path: songData.path,
      });

      if (insertError) {
        return toast.error("Something went wrong, please try again!");
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Song uploaded successfully!");

      reset();
      uploadModel.onClose();
    } catch (err) {
      toast.error("Something went wrong, please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Model
      title="Upload Song"
      description="Upload a MP3 file to add to your library"
      onChange={onChange}
      isOpen={uploadModel.isOpen}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          isLoading={isLoading}
          {...register("title", { required: true })}
          placeholder="Song Title"
        />
        <Input
          id="author"
          isLoading={isLoading}
          {...register("author", { required: true })}
          placeholder="Song Author"
        />
        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            id="song"
            type="file"
            accept=".mp3"
            isLoading={isLoading}
            {...register("song", { required: true })}
          />
        </div>
        <div>
          <div className="pb-1">Select cover image</div>
          <Input
            id="image"
            type="file"
            accept="image/*"
            isLoading={isLoading}
            {...register("image", { required: true })}
          />
        </div>
        <Button type="submit">{isLoading ? "Uploading..." : "Upload"}</Button>
      </form>
    </Model>
  );
}

export default UploadModel;

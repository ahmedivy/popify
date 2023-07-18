'use client'

import useLoadImage from "@/hooks/useLoadImage"
import Image from "next/image"

function MediaItem({ data, onClick }) {

  const imageUrl = useLoadImage(data.image_path)

  const handleClick = () => {
    if (onClick) {
      onClick(data)
      return
    }

    
  }

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
    >
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          src={imageUrl || "/images/placeholder.png"}
          fill
          alt="media item image"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">
          {data.title}
        </p>
        <p className="text-neutral-400 text-sm truncate">
          {data.author}
        </p>
      </div>
    </div>
  )
}

export default MediaItem

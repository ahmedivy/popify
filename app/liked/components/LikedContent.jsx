'use client'

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation"
import { useEffect } from "react";


function LikedContent({ songs }) {

  const router = useRouter();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
        router.replace("/");
    }
  }, [isLoading, user, router])

  if (songs.length === 0) {
    return (
        <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
            Like some songs to see them here!
        </div>
    )
  }

  return (
    <div>
      LikedContent
    </div>
  )
}

export default LikedContent

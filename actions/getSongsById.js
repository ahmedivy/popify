import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";


const getSongsByID = async () => {
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    const { data, error } = await supabase.auth.getSession();

    if (error) {
        console.log(error.message)
        return []
    }

    const { data: songs, error: songsError } = await supabase
        .from('songs')
        .select('*')
        .eq('user_id', data.session?.user.id) // filter by user_id
        .order('created_at', { ascending: false })

    if (songsError) {
        console.log(songsError)
    }

    return songs || []
}

export default getSongsByID
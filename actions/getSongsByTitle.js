import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import getSongs from "./getSongs";


const getSongsByTitle = async (title) => {
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    if (!title) {
        return await getSongs();
    }

    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .ilike('title', `%${title}%`)
        .order('created_at', { ascending: false })

    if (error) {
        console.log(error)
    }

    return data || []
}

export default getSongsByTitle
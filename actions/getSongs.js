import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";


const getSongs = async () => {
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.log(error)
    }

    return data || []
}

export default getSongs
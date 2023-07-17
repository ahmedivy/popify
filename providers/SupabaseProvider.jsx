"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

function SupabaseProvider({ children }) {
  let [supabaseClient, _] = useState(() =>
    createClientComponentClient()
  );

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
        {children}
    </SessionContextProvider>
  )
}

export default SupabaseProvider;

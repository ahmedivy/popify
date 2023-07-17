'use client';

import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";

import Model from "./Model";
import useAuthModel from "@/hooks/useAuthModel";

function AuthModel() {

  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext()

  const { onClose, isOpen } = useAuthModel();

  const onChange = (open) => {
    if (!open) {
        onClose();
    }
  }

  return (
    <Model
        title = "Welcome back!"
        description = "Log in to your account"
        isOpen={isOpen}
        onChange={onChange}
    >
        <Auth
            theme="dark"
            supabaseClient={supabaseClient}
            magicLink
            providers={['github']}
            socialColors={true}
            appearance={{
                theme: ThemeSupa,
                variables: {
                    default: {
                        colors: {
                            brand: '#404040',
                            brandAccent: '#22c55e'
                        }
                    }
                }
            }}
        />
    </Model>
  )
}

export default AuthModel

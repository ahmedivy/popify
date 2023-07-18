import { Figtree } from "next/font/google";

import "./globals.css";
import SupabaseProvider from "@/providers/SupabaseProvider";
import Sidebar from "@/components/Sidebar";
import UserProvider from "@/providers/UserProvider";
import ModelProvider from "@/providers/ModelProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import Player from "@/components/Player";

const font = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Popify",
  description: "Listen to best music!",
};

export const revalidate = 0;

export default async function RootLayout({ children }) {

  const songs = await getSongsByUserId();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModelProvider />
            <Sidebar songs={songs}>{children}</Sidebar> 
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}

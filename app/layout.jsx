import { Figtree } from "next/font/google";

import "./globals.css";
import SupabaseProvider from "@/providers/SupabaseProvider";
import Sidebar from "@/components/Sidebar";
import UserProvider from "@/providers/UserProvider";
import ModelProvider from "@/providers/ModelProvider";
import ToasterProvider from "@/providers/ToasterProvider";

const font = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Popify",
  description: "Listen to best music!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModelProvider />
            <Sidebar>{children}</Sidebar> 
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}

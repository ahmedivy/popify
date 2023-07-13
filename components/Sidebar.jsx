"use client";

import { HiHome } from "react-icons/hi";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { usePathname } from "next/navigation";

import Box from "./Box";
import Library from "./Library";
import SidebarItem from "./SidebarItem";

function Sidebar({ children }) {
  const pathName = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathName !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathName === "/search",
        href: "/search",
      },
    ],
    [pathName]
  );

  return (
    <div className="flex h-full">
      <div className="hidden md:flex  flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => {
              return <SidebarItem key={item.label} {...item} />;
            })}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library />
        </Box>
      </div>
      <main className="overflow-y-auto h-full py-2 flex-1">{children}</main>
    </div>
  );
}

export default Sidebar;

import Link from "next/link";
import { twMerge } from "tailwind-merge";

function SidebarItem({ icon: Icon, label, active, href }) {
  return (
    <Link
      href={href}
      className={twMerge(
        "flex gap-x-4 font-medium h-auto items-center w-full text-md cursor-pointer hover:text-white transition text-neutral-400 py-1",
        active && "text-white"
      )}
    >
      <Icon size={26} />
      <p className="truncate">{label}</p>
    </Link>
  );
}

export default SidebarItem;

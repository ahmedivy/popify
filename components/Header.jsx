"use client";

import { HiHome } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import Button from "./Button";
import { useUser } from "@/hooks/useUser";
import useAuthModel from "@/hooks/useAuthModel";

function Header({ className, children }) {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const { user } = useUser();
  const authModel = useAuthModel();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();

    // reset song playing

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out successfully");
    }
  };

  return (
    <div
      className={twMerge(
        "h-fit bg-gradient-to-b from-emerald-800 p-6",
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex md item-center gap-x-2">
          <button
            onClick={() => router.back()}
            className="flex bg-black items-center justify-center rounded-full hover:opacity-75 transition"
          >
            <RxCaretLeft size={35} className="text-white" />
          </button>
          <button
            onClick={() => router.forward()}
            className="flex bg-black items-center justify-center rounded-full hover:opacity-75 transition"
          >
            <RxCaretRight size={35} className="text-white" />
          </button>
        </div>
        <div className="flex md:hidden items-center gap-x-2">
          <button className="rounded-full p-2 flex item-center hover:opacity-75 bg-white">
            <HiHome size={20} className="text-black" />
          </button>
          <button className="rounded-full p-2 flex item-center hover:opacity-75 bg-white">
            <BiSearch size={20} className="text-black" />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button onClick={handleLogout} className="bg-white px-6 py-2">
                Logout
              </Button>
              <Button
                onClick={() => router.push("/account")}
                className="bg-white"
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={authModel.onOpen}
                  className="bg-transparent text-neutral-300 font-medium"
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button
                  onClick={authModel.onOpen}
                  className="bg-white px-6 py-2"
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

export default Header;

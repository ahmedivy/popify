"use client";

import { UserContextProvider } from "@/hooks/useUser";

const UserProvider = ({ children }) => {
  return <UserContextProvider>{children}</UserContextProvider>;
};

export default UserProvider;
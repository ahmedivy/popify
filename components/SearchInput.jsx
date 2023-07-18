"use client";

import qs from "query-string";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

import Input from "@/components/Input";

function SearchInput() {
  const router = useRouter();

  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: "/search",
      query: { title: debouncedValue },
    });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="What you want to listen ?"
    />
  );
}

export default SearchInput;

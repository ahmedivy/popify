"use client";

import { useEffect, useState } from "react";

import AuthModel from "@/components/AuthModel";
import UploadModel from "@/components/UploadModel";

function ModelProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AuthModel />
      <UploadModel />
    </>
  );
}

export default ModelProvider;

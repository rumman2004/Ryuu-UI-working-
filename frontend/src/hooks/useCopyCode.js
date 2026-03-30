// frontend/src/hooks/useCopyCode.js

import { useState } from "react";
import { incrementCopyCount } from "../services/api";
import toast from "react-hot-toast";

export const useCopyCode = (componentId) => {
  const [copied, setCopied] = useState(false);

  const copy = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Code copied to clipboard!");
      if (componentId) await incrementCopyCount(componentId);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy code");
    }
  };

  return { copied, copy };
};
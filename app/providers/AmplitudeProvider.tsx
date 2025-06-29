"use client";

import { useEffect } from "react";
import { initAmplitude } from "../lib/amplitude";

interface AmplitudeProviderProps {
  children: React.ReactNode;
}

export const AmplitudeProvider = ({ children }: AmplitudeProviderProps) => {
  useEffect(() => {
    initAmplitude();
  }, []);

  return <>{children}</>;
};

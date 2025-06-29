"use client";

import * as amplitude from "@amplitude/analytics-browser";
import { useEffect } from "react";

const initAmplitude = () => {
  amplitude.init(`${process.env.AMPLITUDE_API_KEY}`, undefined, {
    defaultTracking: true,
  });
};

interface AmplitudeProviderProps {
  children: React.ReactNode;
}

export const AmplitudeProvider = ({ children }: AmplitudeProviderProps) => {
  useEffect(() => {
    initAmplitude();
  }, []);

  return <>{children}</>;
};

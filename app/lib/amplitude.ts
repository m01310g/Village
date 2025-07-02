import * as amplitude from "@amplitude/analytics-browser";

export const initAmplitude = () => {
  const deviceId = localStorage.getItem("amplitude_device_id");

  if (deviceId) {
    amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY!, { deviceId });
  } else {
    amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY!);
    const id = amplitude.getDeviceId();
    if (id) {
      localStorage.setItem("amplitude_device_id", id);
    }
  }
};

export const logSignUpEvent = (userId: number) => {
  amplitude.setUserId(`web-user-${userId}`);
  amplitude.track("register_profile", {
    timestamp: new Date().toISOString(),
  });
};

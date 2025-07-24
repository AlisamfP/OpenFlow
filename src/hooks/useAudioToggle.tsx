import { useState, useEffect } from "react";

export function useAudioToggle() {
  const [isAudioOn, setIsAudioOn] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("audioEnabled");
    if (stored !== null) {
      setIsAudioOn(stored === "true");
    }
  }, []);

  const toggleAudio = () => {
    const newValue = !isAudioOn;
    setIsAudioOn(newValue);
    localStorage.setItem("audioEnabled", newValue.toString());
  };

  return { isAudioOn, toggleAudio };
}
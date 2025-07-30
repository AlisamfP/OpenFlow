import useLocalStorage from "./useLocalStorage";

export function useAudioToggle() {
  const [isAudioEnabled, setisAudioEnabled] = useLocalStorage("audioEnabled");

  const toggleAudio = () => {
    setisAudioEnabled(prev => !prev);
  };

  return { isAudioEnabled, toggleAudio };
}
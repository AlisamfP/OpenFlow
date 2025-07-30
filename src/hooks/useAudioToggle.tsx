import useLocalStorage from "./useLocalStorage";

export function useAudioToggle() {
  const [isAudioEnabled, setisAudioEnabled] = useLocalStorage("audioEnabled");

  const toggleAudio = () => {
    const newVal = !isAudioEnabled;
    console.log("toggling audio")
    setisAudioEnabled(newVal);

    window.dispatchEvent(new CustomEvent("audioChanged", { detail: newVal }))
  };

  return { isAudioEnabled, toggleAudio };
}
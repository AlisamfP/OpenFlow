import { useEffect, useState } from "react";

export const useTTS = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const populateVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      if(availableVoices.length > 0){
        setVoices(availableVoices)
      }
    };
    populateVoices();


    window.speechSynthesis.addEventListener("voiceschanged", populateVoices);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", populateVoices);
    }
  }, []);

  const speak = ({
    text,
    pitch = 1,
    rate = 1,
    volume = 1,
    voice = null as SpeechSynthesisVoice | null
  }: {
    text: string;
    pitch?: number;
    rate?: number;
    volume?: number;
    voice?: SpeechSynthesisVoice | null;
  }) => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.volume = volume;
    if (voice) utterance.voice = voice;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  return { speak, voices };
};

export interface TTSVoiceSetting {
    title: string;
    min: number;
    max: number;
    value: number;
    setValue: (val: number) => void;
}

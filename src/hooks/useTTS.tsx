"use client";
import { useEffect, useRef, useState } from "react";

export const useTTS = ({ eager = false }: { eager?: boolean } = {}) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const voicesLoaded = useRef(false);

    const loadVoices = () => {
        if (voicesLoaded.current) return;
        const availableVoices = window.speechSynthesis.getVoices();
        if (availableVoices.length > 0) {
            setVoices(availableVoices);
            voicesLoaded.current = true;
        } else {
            window.speechSynthesis.addEventListener("voiceschanged", () => {
                const v = window.speechSynthesis.getVoices();
                setVoices(v);
                voicesLoaded.current = true;
            }, { once: true });
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if (eager) loadVoices();
    }, [eager]);

    const speak = ({
        text,
        pitch = 1,
        rate = 1,
        volume = 1,
        voiceURI = "",
    }: {
        text: string;
        pitch?: number;
        rate?: number;
        volume?: number;
        voiceURI?: string;
    }) => {
        if (!text) return;

        loadVoices();

        window.speechSynthesis.cancel();

        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.pitch = pitch;
                utterance.rate = rate;
                utterance.volume = volume;
                if (voiceURI) {
                    const found = window.speechSynthesis.getVoices().find(v => v.voiceURI === voiceURI);
                    if (found) utterance.voice = found;
                }
                window.speechSynthesis.speak(utterance);
            });
        });
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
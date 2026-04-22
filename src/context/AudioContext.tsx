"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

const STORAGE_KEY = "openflow-audio-enabled";

interface AudioContextType {
    isAudioEnabled: boolean;
    toggleAudio: () => Promise<void>;
    setAudioEnabled: (value: boolean) => Promise<void>;
}

const AudioContext = createContext<AudioContextType>({
    isAudioEnabled: true,
    toggleAudio: async () => { },
    setAudioEnabled: async () => { }
})

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const { data: session } = authClient.useSession();
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored !== null) {
            setIsAudioEnabled(stored === "true")
        }
        setMounted(true);
    }, []);

    const toggleAudio = async () => {
        const newValue = !isAudioEnabled;
        setIsAudioEnabled(newValue);
        localStorage.setItem(STORAGE_KEY, String(newValue));
        console.log(`audio should be toggled to: ${newValue}`)
    }
    const setAudioEnabled = async (value: boolean) => {
        setIsAudioEnabled(value);
        localStorage.setItem(STORAGE_KEY, String(value));
        if (session) {
            await fetch("/api/user/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ audio: { enabled: value } })
            })
        }
    }
    return (
        <AudioContext.Provider value={{
            isAudioEnabled: mounted ? isAudioEnabled : true,
            toggleAudio,
            setAudioEnabled
        }}>
            {children}
        </AudioContext.Provider>
    )
}

export function useAudioToggle() {
    return useContext(AudioContext);
}
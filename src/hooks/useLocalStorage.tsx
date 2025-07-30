import { useState, useEffect, type SetStateAction } from "react";
import { validateValues } from "./validateValues";
import type { LocalStorageMap, LocalStorageKey } from "./localStorageConfig";


function useLocalStorage<K extends LocalStorageKey>(
    key: K, 
): [LocalStorageMap[K], (value: SetStateAction<LocalStorageMap[K]>) => void] {

    console.log(`in local storage for ${key}`)

    const [value, setValue] = useState<LocalStorageMap[K]>(() => {

        try {
            const item = localStorage.getItem(key);
            console.log(`item: ${item}`)
            const parsed = item ? JSON.parse(item) : undefined;
            console.log(`parsed: ${parsed}`)
            return validateValues(key, parsed);
        } catch (e) {
            console.warn(`Error parsing localStorage key ${key}: `, e)
            localStorage.removeItem(key);
            return validateValues(key, undefined);
        }
    });

    useEffect(() => {
        try {
            const validValue = validateValues(key, value);
            localStorage.setItem(key, JSON.stringify(validValue));
        }catch (e) {
            console.warn(`Error saving ${key} to localStorage: `, e)
        }
    }, [key, value]);

    function setValidatedValue(newVal: SetStateAction<LocalStorageMap[K]>){

        if(typeof newVal === "function") {
            console.log(`set Validated Value new val for ${key} is function`)
            setValue((prev) => {
                const result = (newVal as (prev: LocalStorageMap[K]) => LocalStorageMap[K])(prev)
                return validateValues(key, result)
            })
        }else {
            setValue(validateValues(key, newVal))
        }
    }

    return [value, setValidatedValue] as const;
}

export default useLocalStorage;
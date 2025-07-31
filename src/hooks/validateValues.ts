import { localStorageSchema, type LocalStorageKey, type LocalStorageMap } from "./localStorageConfig";
import type { CardData } from "../types/cardTypes";

function isEnumValue<T extends readonly string[]>(
    values: T, 
    val: unknown
): val is T[number]{
    return typeof val === "string" && values.includes(val as T[number])
}

function isCardData(obj: unknown):obj is CardData {
    return (
        typeof obj === "object" &&
        obj !== null &&
        "id" in obj &&
        "text" in obj &&
        "icon" in obj
    )
}

export function validateValues<K extends LocalStorageKey>(
    key: K, 
    value: unknown
): LocalStorageMap[K]{
    const config = localStorageSchema[key];

    if(!config) {
        throw new Error(`Invalid config key: ${key}`);
    }

    if(config.type === "range") {
        const num = Number(value);
        if(isNaN(num)) return config.fallback as LocalStorageMap[K]
        else {
            return Math.min(config.max, Math.max(config.min, num)) as LocalStorageMap[K];
        } 
    }

    else if(config.type === "enum"){
        return (isEnumValue(config.values, value) ? value : config.fallback) as LocalStorageMap[K];
    }
    else if (config.type === "string"){
        return (typeof value === "string" ? value : config.fallback) as LocalStorageMap[K]
    }
    else if (config.type === "boolean"){
        return (typeof value === "boolean" ? value : config.fallback) as LocalStorageMap[K]
    }
    else if (config.type === "array"){
        if (Array.isArray(value)){
            if(config.itemType === "CardData"){
                if(value.every(isCardData)) {
                    return value as LocalStorageMap[K]
                }
            }else if (value.every(item => typeof item === config.itemType)){
                return value as LocalStorageMap[K]
            }
        }

        return config.fallback as LocalStorageMap[K];
    }
    else {
        const _exhaustiveCheck: never = config;
        return _exhaustiveCheck;
    }

}

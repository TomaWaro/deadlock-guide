import { useState, useEffect } from 'react';
import { getStorageItem, setStorageItem } from '@/utils/localStorage';

export function useLocalStorage<T>(key: string, initialValue: T) {
    // Use a function for initial state to avoid reading storage on every render
    const [storedValue, setStoredValue] = useState<T>(() => {
        return getStorageItem(key, initialValue);
    });

    useEffect(() => {
        setStorageItem(key, storedValue);
    }, [key, storedValue]);

    return [storedValue, setStoredValue] as const;
}

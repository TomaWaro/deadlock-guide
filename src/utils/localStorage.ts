export const getStorageItem = <T>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue;
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.warn(`Error reading localStorage key "${key}":`, error);
        return defaultValue;
    }
};

export const setStorageItem = <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn(`Error writing localStorage key "${key}":`, error);
    }
};

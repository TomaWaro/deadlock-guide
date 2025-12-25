import { useEffect, useState } from 'react';
import { generateUserId } from '@/utils/userIdGenerator';
import { STORAGE_KEYS } from '@/utils/constants';
import { getStorageItem, setStorageItem } from '@/utils/localStorage';

export function useUser() {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        // Check if we already have an ID in storage (synchronously if possible, but strict mode might need effect)
        // We used getStorageItem so it's safe.
        // However, since this is an effect, it runs client-side.
        const existingId = getStorageItem<string | null>(STORAGE_KEYS.USER_ID, null);

        if (existingId) {
            setUserId(existingId);
        } else {
            const newId = generateUserId();
            setStorageItem(STORAGE_KEYS.USER_ID, newId);
            setUserId(newId);
        }
    }, []);

    return { userId };
}

import { useLocalStorage } from './useLocalStorage';
import { UserProgress } from '@/types/progress';
import { STORAGE_KEYS } from '@/utils/constants';

export function useProgress(userId: string | null) {
    // Store all users' progress in one object: { [userId]: UserProgress }
    const [allProgress, setAllProgress] = useLocalStorage<Record<string, UserProgress>>(
        STORAGE_KEYS.PROGRESS,
        {}
    );

    const getUserProgress = (): UserProgress => {
        if (!userId) {
            return { userId: '', guides: {}, lastUpdated: 0 };
        }
        return allProgress[userId] || { userId, guides: {}, lastUpdated: Date.now() };
    };

    const toggleSection = (guideId: string, sectionId: string) => {
        if (!userId) return;

        const currentMap = allProgress;
        const userProg = currentMap[userId] || { userId, guides: {}, lastUpdated: 0 };

        const guideProg = userProg.guides[guideId] || {};
        const isComplete = !!guideProg[sectionId];

        const newGuideProg = { ...guideProg, [sectionId]: !isComplete };

        const newUserProg = {
            ...userProg,
            guides: { ...userProg.guides, [guideId]: newGuideProg },
            lastUpdated: Date.now()
        };

        setAllProgress({ ...currentMap, [userId]: newUserProg });
    };

    const isSectionCompleted = (guideId: string, sectionId: string) => {
        if (!userId) return false;
        const userProg = allProgress[userId];
        return !!userProg?.guides?.[guideId]?.[sectionId];
    };

    const getGuideCompletedCount = (guideId: string) => {
        if (!userId) return 0;
        const guideProg = allProgress[userId]?.guides?.[guideId];
        if (!guideProg) return 0;
        return Object.values(guideProg).filter(Boolean).length;
    };

    return { toggleSection, isSectionCompleted, getGuideCompletedCount, progress: getUserProgress() };
}

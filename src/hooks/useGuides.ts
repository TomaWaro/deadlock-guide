import { useState, useEffect } from 'react';
import { Guide, GuidesData } from '@/types/guide';

export function useGuides() {
    const [guides, setGuides] = useState<Guide[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchGuides() {
            try {
                const response = await fetch('/data/guides.json');
                if (!response.ok) throw new Error('Failed to fetch guides');
                const data: GuidesData = await response.json();
                // Sort by order just in case
                const sortedGuides = (data.guides || []).sort((a, b) => a.order - b.order);
                setGuides(sortedGuides);
            } catch (err) {
                console.error("Error loading guides:", err);
                setError(err instanceof Error ? err : new Error('Unknown error'));
            } finally {
                setLoading(false);
            }
        }

        fetchGuides();
    }, []);

    const getGuideById = (id: string) => guides.find(g => g.id === id) || null;

    return { guides, loading, error, getGuideById };
}

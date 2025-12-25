'use client';
import React from 'react';
import { notFound, useParams } from 'next/navigation';
import { useGuides } from '@/hooks/useGuides';
import { useUser } from '@/hooks/useUser';
import { useProgress } from '@/hooks/useProgress';
import { GuideLayout } from '@/components/guides/GuideLayout';
import { SectionCard } from '@/components/guides/SectionCard';

// Guides Detail Layout handled by GuideLayout component mostly
// Just ensuring proper spacing here
export default function GuidePage() {
    const params = useParams();
    const guideId = params?.guideId as string;
    const { getGuideById, loading } = useGuides();
    const { userId } = useUser();
    const { toggleSection, isSectionCompleted, getGuideCompletedCount } = useProgress(userId);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-deadlock-amber tracking-widest uppercase">Initializing Interface...</div>;

    const guide = getGuideById(guideId);
    if (!guide) return notFound();

    return (
        <GuideLayout guide={guide} completedCount={getGuideCompletedCount(guide.id)}>
            <div className="space-y-12">
                {guide.sections.map((section) => (
                    <SectionCard
                        key={section.id}
                        section={section}
                        isCompleted={isSectionCompleted(guide.id, section.id)}
                        onToggleComplete={() => toggleSection(guide.id, section.id)}
                    />
                ))}
            </div>
        </GuideLayout>
    );
}

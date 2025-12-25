'use client';
import React from 'react';
import { useGuides } from '@/hooks/useGuides';
import { useUser } from '@/hooks/useUser';
import { useProgress } from '@/hooks/useProgress';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GuideCard } from '@/components/guides/GuideCard';
import { ProgressBar } from '@/components/progress/ProgressBar';

export default function Dashboard() {
  const { guides, loading } = useGuides();
  const { userId } = useUser();
  const { getGuideCompletedCount } = useProgress(userId);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">Loading guides...</div>;
  }

  // Calculate global progress
  const totalSections = guides.reduce((acc, g) => acc + g.sections.length, 0);
  const totalCompleted = guides.reduce((acc, g) => acc + getGuideCompletedCount(g.id), 0);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-deadlock-amber selection:text-black">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-24 w-full relative z-10">
        <section className="mb-20 text-center space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full border border-deadlock-amber/30 bg-deadlock-amber/10 text-deadlock-amber text-sm font-medium tracking-widest uppercase mb-4">
            Official Community Guide
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 tracking-tight font-serif drop-shadow-lg">
            DEADLOCK <br />
            <span className="text-deadlock-amber text-glow">MASTERY</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            Dominate the streets of New York. Master advanced movement, learn hero mechanics, and track your progress to becoming a <span className="text-deadlock-green font-medium">Patron</span>.
          </p>
        </section>

        <section className="mb-20 bg-[#1e1e24]/60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-deadlock-amber to-transparent opacity-50" />

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 relative z-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-100 font-serif mb-2">Global Knowledge Status</h2>
              <p className="text-gray-400">Your journey through the occult underground.</p>
            </div>
            <div className="text-right">
              <span className="text-5xl font-black text-deadlock-amber text-glow">
                {Math.round(totalSections > 0 ? (totalCompleted / totalSections) * 100 : 0)}%
              </span>
              <span className="text-gray-500 text-sm uppercase tracking-widest block mt-1">Completion</span>
            </div>
          </div>
          <ProgressBar current={totalCompleted} total={totalSections} className="h-3" />
        </section>

        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-2xl font-bold text-gray-100 font-serif">Available Guides</h3>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.length > 0 ? (
            guides.map(guide => (
              <GuideCard
                key={guide.id}
                guide={guide}
                completedSections={getGuideCompletedCount(guide.id)}
                totalSections={guide.sections.length}
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-2xl">
              <p className="text-gray-500 text-lg">No archives found in the library.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

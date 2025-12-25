import React from 'react';
import Link from 'next/link';
import { Guide } from '@/types/guide';
import { ProgressBar } from '@/components/progress/ProgressBar';
import { ArrowLeft, BookOpen } from 'lucide-react';

interface GuideLayoutProps {
    children: React.ReactNode;
    guide: Guide;
    completedCount: number;
}

export const GuideLayout: React.FC<GuideLayoutProps> = ({ children, guide, completedCount }) => {
    const total = guide.sections.length;

    return (
        <div className="min-h-screen bg-deadlock-dark font-sans selection:bg-deadlock-amber selection:text-black pb-20">
            <header className="sticky top-0 z-40 bg-[#1e1e24]/90 backdrop-blur-md border-b border-white/5 shadow-2xl transition-all">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-4 mb-4">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-deadlock-amber transition-colors group"
                        >
                            <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-deadlock-amber/20 transition-colors">
                                <ArrowLeft size={16} />
                            </div>
                            <span className="uppercase tracking-widest text-xs hidden sm:inline-block">Dashboard</span>
                        </Link>

                        <div className="h-6 w-px bg-white/10" />

                        <div className="flex-1 min-w-0">
                            <h1 className="text-lg md:text-xl font-bold text-gray-100 truncate flex items-center gap-2 font-serif">
                                <BookOpen className="w-5 h-5 text-deadlock-amber hidden sm:block" />
                                {guide.title}
                            </h1>
                        </div>

                        <div className="ml-auto flex items-center gap-2 shrink-0">
                            <span className={`
                                text-xs font-bold px-3 py-1 rounded-full border tracking-wider
                                ${completedCount === total
                                    ? 'bg-deadlock-green/10 border-deadlock-green/30 text-deadlock-green'
                                    : 'bg-white/5 border-white/10 text-gray-400'
                                }
                            `}>
                                {completedCount} / {total}
                            </span>
                        </div>
                    </div>
                    <ProgressBar current={completedCount} total={total} className="h-1" />
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-12">
                {children}
            </main>
        </div>
    );
};

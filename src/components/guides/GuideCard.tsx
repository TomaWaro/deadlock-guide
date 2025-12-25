import React from 'react';
import Link from 'next/link';
import { Guide } from '@/types/guide';
import { ProgressBar } from '@/components/progress/ProgressBar';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

interface GuideCardProps {
    guide: Guide;
    completedSections: number;
    totalSections: number;
}

export const GuideCard: React.FC<GuideCardProps> = ({ guide, completedSections, totalSections }) => {
    return (
        <Link href={`/guides/${guide.id}`} className="block h-full">
            <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative bg-[#1e1e24]/80 backdrop-blur-sm rounded-xl border border-white/10 p-6 h-full flex flex-col overflow-hidden hover:border-deadlock-amber/50 hover:bg-[#1e1e24] transition-colors"
            >
                {/* Glow Effect on Hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-deadlock-amber/10 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold font-serif text-gray-100 group-hover:text-deadlock-amber transition-colors">
                        {guide.title}
                    </h3>
                    <BookOpen className="w-5 h-5 text-gray-500 group-hover:text-deadlock-amber transition-colors" />
                </div>

                <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {guide.description}
                </p>

                <div className="mt-auto pt-4 border-t border-white/5">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">Progression</span>
                        <span className="text-xs font-mono text-deadlock-amber">
                            {Math.round((completedSections / totalSections) * 100)}%
                        </span>
                    </div>
                    <ProgressBar current={completedSections} total={totalSections} />
                </div>
            </motion.div>
        </Link>
    );
};

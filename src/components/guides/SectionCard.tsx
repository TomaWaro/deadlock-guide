import ReactMarkdown from 'react-markdown';
import React from 'react';
import { Section } from '@/types/guide';
import { YouTubeEmbed } from '@/components/media/YouTubeEmbed';
import { CompletionCheckbox } from '@/components/progress/CompletionCheckbox';
import { motion } from 'framer-motion';
import { Lightbulb, Hash } from 'lucide-react';

interface SectionCardProps {
    section: Section;
    isCompleted: boolean;
    onToggleComplete: () => void;
}

export const SectionCard: React.FC<SectionCardProps> = ({ section, isCompleted, onToggleComplete }) => {
    return (
        <motion.div
            id={section.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className={`
                relative rounded-xl p-6 md:p-8 border backdrop-blur-md transition-all duration-300
                ${isCompleted
                    ? 'bg-deadlock-green/5 border-deadlock-green/30 shadow-[0_0_20px_rgba(102,255,153,0.1)]'
                    : 'bg-[#1e1e24]/90 border-white/10 hover:border-white/20'
                }
            `}
        >
            {/* Completed corner accent */}
            {isCompleted && (
                <div className="absolute top-0 right-0 w-2 h-2 bg-deadlock-green shadow-[0_0_10px_#66ff99]" />
            )}

            <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded bg-white/5 text-gray-500 font-mono text-sm">
                    <Hash size={14} /> {section.order}
                </div>
                <h2 className={`text-2xl font-bold font-serif tracking-wide ${isCompleted ? 'text-deadlock-green' : 'text-gray-100'}`}>
                    {section.title}
                </h2>
            </div>

            <div className="prose prose-invert max-w-none mb-8 text-gray-300 prose-headings:font-serif prose-headings:text-deadlock-amber prose-strong:text-white prose-code:text-deadlock-amber prose-code:bg-white/5 prose-code:px-1 prose-code:rounded">
                <ReactMarkdown>{section.content}</ReactMarkdown>
            </div>

            {/* Media Grid */}
            {section.media && section.media.length > 0 && (
                <div className="grid grid-cols-1 gap-8 mb-8">
                    {section.media.map((item, index) => {
                        if (item.type === 'youtube') {
                            return (
                                <div key={index} className="rounded-xl overflow-hidden border border-white/10 shadow-2xl ring-1 ring-white/5">
                                    <YouTubeEmbed
                                        url={item.url}
                                        timestamp={item.timestamp}
                                        title={`Video for ${section.title}`}
                                        className="aspect-[16/9] w-full"
                                    />
                                </div>
                            );
                        } else if (item.type === 'image') {
                            return (
                                <div key={index} className="rounded-xl overflow-hidden border border-gray-700 shadow-2xl">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={item.url} alt={item.alt || section.title} className="w-full h-auto" loading="lazy" />
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            )}

            {/* Tips */}
            {section.tips && section.tips.length > 0 && (
                <div className="bg-blue-500/5 border border-blue-500/20 p-5 mb-8 rounded-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                    <h4 className="font-bold text-blue-400 mb-3 flex items-center gap-2 uppercase tracking-wider text-sm">
                        <Lightbulb size={18} /> Pro Tips
                    </h4>
                    <ul className="space-y-2 text-blue-200/90 text-sm">
                        {section.tips.map((tip, idx) => (
                            <li key={idx} className="flex gap-2">
                                <span className="text-blue-500">•</span>
                                {tip}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Footer / Action */}
            <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
                <CompletionCheckbox
                    completed={isCompleted}
                    onToggle={onToggleComplete}
                    label="TECHNIQUE MAÎTRISÉE"
                />
            </div>
        </motion.div>
    );
};

import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface CompletionCheckboxProps {
    completed: boolean;
    onToggle: () => void;
    label?: string;
    className?: string;
}

export const CompletionCheckbox: React.FC<CompletionCheckboxProps> = ({ completed, onToggle, label = "TECHNIQUE MAÎTRISÉE", className }) => {
    return (
        <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={onToggle}
            className={clsx(
                "group flex items-center gap-4 p-4 rounded-xl cursor-pointer border transition-all select-none relative overflow-hidden",
                completed
                    ? "bg-deadlock-green/10 border-deadlock-green/50 text-deadlock-green shadow-[0_0_15px_rgba(102,255,153,0.15)]"
                    : "bg-white/5 border-white/10 hover:border-deadlock-amber/50 hover:bg-white/10 text-gray-400 hover:text-gray-200",
                className
            )}
        >
            {/* Animated Background Pulse on Complete */}
            {completed && (
                <motion.div
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-deadlock-green/20 rounded-full blur-xl"
                />
            )}

            <div className={clsx(
                "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 relative z-10",
                completed
                    ? "bg-deadlock-green text-black font-bold shadow-[0_0_10px_#66ff99]"
                    : "bg-black/50 border border-white/20 group-hover:border-deadlock-amber"
            )}>
                {completed && (
                    <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                    >
                        <Check size={18} strokeWidth={3} />
                    </motion.div>
                )}
            </div>
            <span className="font-bold tracking-wider text-sm uppercase relative z-10">{label}</span>
        </motion.div>
    );
};

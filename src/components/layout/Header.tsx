import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

export const Header: React.FC = () => {
    return (
        <header className="fixed top-0 w-full z-50 bg-deadlock-dark/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="p-2 bg-deadlock-amber/10 rounded-lg border border-deadlock-amber/20"
                    >
                        <Flame className="w-6 h-6 text-deadlock-amber drop-shadow-[0_0_8px_rgba(238,187,85,0.5)]" />
                    </motion.div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold tracking-wider text-gray-100 uppercase font-serif">
                            Deadlock
                        </span>
                        <span className="text-xs text-deadlock-amber tracking-[0.2em] font-medium uppercase">
                            Learning Guide
                        </span>
                    </div>
                </Link>
                <nav>
                    {/* Future nav items */}
                </nav>
            </div>
        </header>
    );
};

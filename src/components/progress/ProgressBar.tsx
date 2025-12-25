import React from 'react';

interface ProgressBarProps {
    current: number;
    total: number;
    showPercentage?: boolean;
    className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, showPercentage = false, className = "" }) => {
    const percentage = total > 0 ? Math.min(100, Math.max(0, (current / total) * 100)) : 0;

    return (
        <div className={`w-full ${className}`}>
            {showPercentage && (
                <div className="flex justify-between items-center mb-1 text-xs font-medium text-gray-400 font-mono tracking-wider">
                    <span>PROGRESSION</span>
                    <span className="text-deadlock-amber">{Math.round(percentage)}%</span>
                </div>
            )}
            <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                <div
                    className="h-full bg-gradient-to-r from-deadlock-amber to-deadlock-amber-glow shadow-[0_0_10px_rgba(238,187,85,0.4)] transition-all duration-500 ease-out relative"
                    style={{ width: `${percentage}%` }}
                >
                    {percentage > 0 && <div className="absolute right-0 top-0 h-full w-1 bg-white/50 blur-[1px]" />}
                </div>
            </div>
        </div>
    );
};

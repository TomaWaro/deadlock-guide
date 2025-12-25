import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                <p>Deadlock Learning Guide &copy; {new Date().getFullYear()}</p>
                <p className="mt-1">Master the game, one step at a time.</p>
            </div>
        </footer>
    );
};

import React from 'react';

interface YouTubeEmbedProps {
    url: string;
    title?: string;
    timestamp?: number;
    className?: string;
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ url, title = "YouTube Video", timestamp = 0, className = "" }) => {
    let videoId = "";
    try {
        const urlObj = new URL(url);
        if (urlObj.hostname === 'youtu.be') {
            videoId = urlObj.pathname.slice(1);
        } else if (urlObj.hostname.includes('youtube.com')) {
            const v = urlObj.searchParams.get('v');
            if (v) videoId = v;
        }
    } catch (e) {
        console.error("Invalid YouTube URL", url);
    }

    if (!videoId) {
        // Fallback for direct ID if user put just ID in JSON (unlikely but safe)
        if (!url.includes('/')) videoId = url;
        else return <div className="text-red-500 p-4 border border-red-200 rounded">Invalid Video URL</div>;
    }

    const src = `https://www.youtube.com/embed/${videoId}${timestamp ? `?start=${timestamp}` : ''}`;

    return (
        <div className={`relative w-full aspect-video rounded-lg overflow-hidden shadow-lg bg-black ${className}`}>
            <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={src}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
};

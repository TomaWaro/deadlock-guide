export interface GuideProgress {
    [sectionId: string]: boolean;
}

export interface UserProgress {
    userId: string;
    guides: {
        [guideId: string]: GuideProgress;
    };
    lastUpdated: number;
}

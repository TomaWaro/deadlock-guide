export interface Media {
  type: 'youtube' | 'image';
  url: string;
  timestamp?: number;     // Secondes (pour YouTube)
  alt?: string;           // Pour images
  title?: string;
}

export interface Section {
  id: string;
  title: string;
  order: number;
  content: string;        // Markdown possible
  media: Media[];
  tips?: string[];        // Points clés optionnels
}

export interface Guide {
  id: string;
  title: string;
  description: string;
  order: number;
  sections: Section[];
}

export interface GuidesData {
  guides: Guide[];
}

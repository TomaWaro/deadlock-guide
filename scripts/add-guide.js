const fs = require('fs');
const path = require('path');

// Usage: node scripts/add-guide.js guides/my-new-guide.md
const inputFile = process.argv[2];
const outputFile = path.join(__dirname, '../public/data/guides.json');

if (!inputFile || !fs.existsSync(inputFile)) {
    console.error('❌ Error: Please provide a valid markdown file path.');
    console.error('Usage: npm run add-guide guides/TEMPLATE.md');
    process.exit(1);
}

function parseGuideMarkdown(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');

    // Parse metadata (top section)
    const metadataMatch = content.match(/# Guide Metadata\n([\s\S]*?)\n---/);
    const metadata = {};

    if (metadataMatch) {
        metadataMatch[1].split('\n').forEach(line => {
            const parts = line.split(': ');
            if (parts.length >= 2) {
                const key = parts[0].trim().toLowerCase();
                const value = parts.slice(1).join(': ').trim();
                metadata[key] = value;
            }
        });
    }

    const sections = [];
    // Robust parsing using split instead of regex lookahead
    // This avoids issues where regex stops matching midway through the file
    const chunks = content.split(/^## Section /m);

    // Chunk 0 is metadata, skip it.
    let sectionOrder = 1;

    for (let i = 1; i < chunks.length; i++) {
        const chunk = chunks[i];

        const firstLineEnd = chunk.indexOf('\n');
        if (firstLineEnd === -1) continue;

        const header = chunk.substring(0, firstLineEnd).trim(); // e.g. "3: Glissade (Sliding)"
        const sectionBody = chunk.substring(firstLineEnd + 1);

        // Extract Title
        const colonIndex = header.indexOf(':');
        let title = header;
        if (colonIndex !== -1) {
            title = header.substring(colonIndex + 1).trim();
        }

        console.log(`Processing Section: ${title}`);

        // Extract Content
        const contentMatch = sectionBody.match(/### Content\s*([\s\S]*?)(?=(?:^|\n)\s*### (?:Media|Tips)|$)/);
        const content = contentMatch ? contentMatch[1].trim() : '';

        // Extract Media
        const media = [];
        const mediaMatch = sectionBody.match(/### Media\s*([\s\S]*?)(?=(?:^|\n)\s*### Tips|$)/);
        if (mediaMatch) {
            mediaMatch[1].split('\n').forEach(line => {
                line = line.trim();
                if (line.startsWith('- YouTube:')) {
                    const urlRaw = line.replace('- YouTube:', '').trim();
                    const [url, timeParam] = urlRaw.split('?t=');
                    let timestamp = 0;
                    if (timeParam) timestamp = parseInt(timeParam);
                    media.push({ type: 'youtube', url: url.trim(), timestamp });
                } else if (line.startsWith('- Image:')) {
                    const url = line.replace('- Image:', '').trim();
                    media.push({ type: 'image', url });
                }
            });
        }

        // Extract Tips
        const tips = [];
        const tipsMatch = sectionBody.match(/### Tips\s*([\s\S]*?)$/);
        if (tipsMatch) {
            tipsMatch[1].split('\n').forEach(line => {
                line = line.trim();
                if (line.startsWith('- ')) {
                    tips.push(line.substring(2));
                }
            });
        }

        sections.push({
            id: title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
            title,
            order: sectionOrder++,
            content,
            media,
            tips: tips.length ? tips : undefined
        });
    }

    return {
        id: metadata.id || 'unknown-guide',
        title: metadata.title || 'Untitled Guide',
        description: metadata.description || '',
        order: parseInt(metadata.order) || 99,
        sections
    };
}

try {
    const newGuide = parseGuideMarkdown(inputFile);

    // Read existing data
    let data = { guides: [] };
    if (fs.existsSync(outputFile)) {
        data = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
    }

    // Update or Add
    const existingIdx = data.guides.findIndex(g => g.id === newGuide.id);
    if (existingIdx !== -1) {
        console.log(`🔄 Updating existing guide: ${newGuide.title}`);
        data.guides[existingIdx] = newGuide;
    } else {
        console.log(`✨ Adding new guide: ${newGuide.title}`);
        data.guides.push(newGuide);
    }

    // Sort
    data.guides.sort((a, b) => a.order - b.order);

    fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
    console.log(`✅ Successfully saved to public/data/guides.json`);

} catch (e) {
    console.error('Failed to parse guide:', e);
}

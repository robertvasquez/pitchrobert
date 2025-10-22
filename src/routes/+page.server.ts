import type { PageServerLoad } from './$types';
import fs from 'node:fs';
import path from 'node:path';

const ALLOWED_EXT = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif']);

export const load: PageServerLoad = async () => {
    // Resolve absolute path to the slides directory in static
    const slidesDir = path.join(process.cwd(), 'static', 'slides');
    let slides: string[] = [];

    try {
        const entries = await fs.promises.readdir(slidesDir, { withFileTypes: true });
        slides = entries
            .filter((e) => e.isFile() && ALLOWED_EXT.has(path.extname(e.name).toLowerCase()))
            .map((e) => `/slides/${e.name}`)
            .sort((a, b) => a.localeCompare(b));
    } catch (err) {
        // Directory may not exist or be unreadable; keep slides empty
        // console.warn('Unable to read slides directory:', err);
    }

    return { slides };
};

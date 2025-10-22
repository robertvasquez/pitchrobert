import type { PageServerLoad } from './$types';

const modules = import.meta.glob('/static/slides/*.{png,jpg,jpeg,gif,webp,avif}', { eager: true });

export const load: PageServerLoad = async () => {
    const slides = Object.keys(modules)
        .map((path) => path.replace('/static', ''))
        .sort();
    return { slides };
};

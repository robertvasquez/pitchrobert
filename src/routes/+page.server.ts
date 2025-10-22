import type { PageServerLoad } from './$types';

// Hard-coded list of slide images that start with "Slide" in the static root.
// Using absolute paths so they resolve correctly from the /static directory at runtime.
const slides = [
    '/SlideA1.PNG',
    '/SlideB2.PNG',
    '/SlideC3.PNG',
    '/SlideD4.PNG',
    '/SlideE5.PNG',
    '/SlideF6.PNG',
    '/SlideG7.PNG',
    '/SlideH8.PNG',
    '/SlideI9.PNG',
    '/SlideJ10.PNG',
    '/SlideK11.PNG'
];

export const load: PageServerLoad = async () => {
    return { slides };
};

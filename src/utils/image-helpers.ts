import { urlForFullImage, urlForImage } from '@/sanity/lib/image';
import { SanityImageObject } from '@sanity/image-url/lib/types/types';
import { GalleryImage } from '@/sanity/lib/types';

export const logo = new URL('/logo.svg', process.env.NEXT_PUBLIC_URL).toString();

export function getImageUrl(source: SanityImageObject | GalleryImage | null) {

    return source ? urlForImage(source) : logo;
}

export function getFullImageUrl(source: GalleryImage | null) {
    return (source && source.asset) ? urlForFullImage(source.asset) : logo;
}
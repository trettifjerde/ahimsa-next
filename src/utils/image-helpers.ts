import { urlForFullImage, urlForImage } from '@/sanity/lib/image';
import logo from '@/../public/logo.svg';
import { SanityImageObject } from '@sanity/image-url/lib/types/types';
import { GalleryImage } from '@/sanity/lib/types';

export function getImageUrl(source: SanityImageObject | GalleryImage | null) {

    return source ? urlForImage(source) : logo;
}

export function getFullImageUrl(source: GalleryImage | null) {
    return (source && source.asset) ? urlForFullImage(source.asset) : logo;
}
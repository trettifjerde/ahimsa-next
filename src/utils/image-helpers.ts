import { urlForImage } from '@/sanity/lib/image';
import logo from '@/../public/logo.svg';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export function getImageUrl(source: SanityImageSource | null) {

    return source ? urlForImage(source) : logo;
}
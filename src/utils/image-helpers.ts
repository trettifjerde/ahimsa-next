import { ImageInfo } from "@/sanity/lib/types";
import getSanityImageUrl from "./image-loader";

export function getLogoUrl() {
    return `${process.env.NEXT_PUBLIC_URL}/images/logo.svg`;
}

export function getMetaImageUrl(source: ImageInfo) {
    return source ? getSanityImageUrl({source, full: false, width: 200, quality: 85, square: true}) : getLogoUrl();
}

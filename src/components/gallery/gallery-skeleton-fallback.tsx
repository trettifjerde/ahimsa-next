import { GALLERY_BATCH_SIZE } from "@/utils/env-fallback";
import GallerySkeletonPic from "./gallery-skeleton-pic";

export function GallerySkeletonFallback() {
    const ns : number[] = [];
    for (let i = 0; i < GALLERY_BATCH_SIZE; i++)
        ns.push(i);

    return <>{ns.map(n => <GallerySkeletonPic key={n} />)}</>
}
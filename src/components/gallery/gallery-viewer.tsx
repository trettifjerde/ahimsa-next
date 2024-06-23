import { GalleryEntryPic } from "@/sanity/lib/types";
import { GalleryViewerClient } from "./gallery-viewer-client";

export default function GalleryViewer({ pics }: { pics: GalleryEntryPic[] }) {

    if (pics.length > 0)
        return <GalleryViewerClient pics={pics} />

    else
        return <div style={{
            gridColumn: '1/-1',
            textAlign: 'center',
            paddingBlock: '15%'
        }}>Nema slika</div>
}
import { GalleryEvent, GalleryEventPics } from "@/sanity/lib/types";
import GalleryPic from "./gallery-pic";
import { newsType } from "@/sanity/schemaTypes/newsType";

export default function GalleryEntry({gallery, title, type, slug}: {slug: string, title: string, type: string, gallery: GalleryEventPics}) {
    return <>
        {gallery?.map((image, i) => <GalleryPic key={i} slug={getSlug(type, slug)} image={image} title={title} />)}
    </>
}

function getSlug(type: string, slug: string) {
    let section = '';

    switch (type) {
        case newsType.name:
            section = 'news';
            break;

    }

    return `/${section}/${slug}`;

}
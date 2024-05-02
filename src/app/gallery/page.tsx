import { redirect } from "next/navigation";
import { getYearGallery } from "@/sanity/lib/fetches";
import { GalleryEvent } from "@/sanity/lib/types";
import { GALLERY_BATCH_SIZE, getListQueryParams } from "@/utils/serverHelpers";
import GalleryEntry from "@/components/gallery/gallery-entry";
import GalleryFetcher from "@/components/gallery/gallery-fetcher";
import styles from './p.module.css';

export default async function Gallery({ searchParams }: { searchParams?: { year?: string } }) {
    const year = searchParams?.year;
    const fetchParams = getListQueryParams({ year });

    // url params provided and invalid
    if (!fetchParams)
        redirect('/gallery');

    const entries = await getYearGallery(fetchParams);

    if (!entries)
        throw new Error('Failed to fetch gallery');

    const lastEntry : GalleryEvent | undefined = entries[entries.length - 1];

    return <>
        {entries.map(item => <GalleryEntry key={item._id} 
            type={item._type} slug={item.slug} 
            title={item.title} gallery={item.gallery} />)}

        {!lastEntry && <div className={styles.emp}>No photos this year</div>}

        <GalleryFetcher 
            batchSize={GALLERY_BATCH_SIZE} 
            yearMeta={{
                hasMore: entries.length == GALLERY_BATCH_SIZE,
                lastDate: lastEntry?.date || '',
                lastId: lastEntry?._id || '',
                year
            }} />
    </>
}
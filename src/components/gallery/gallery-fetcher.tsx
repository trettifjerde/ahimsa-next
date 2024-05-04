'use client'

import { SpinnerButton } from "../ui/buttons";
import useBatchFetcher, { GetContentFromInit, GetContentFromRaw, RawInfo } from "@/hooks/useBatchFetcher";
import { GalleryEvent, GalleryEventPic } from "@/sanity/lib/types";
import styles from './fetcher.module.css';
import GalleryPic from "./gallery-pic";

type GalleryInitInfo = RawInfo<GalleryEvent>;

export default function GalleryFetcher({initInfo}: {initInfo: GalleryInitInfo}) {

    const {loading, hasMore, items, handleFetchMore} = useBatchFetcher<GalleryInitInfo, GalleryEvent, GalleryEventPic>({
        initInfo, url: "/gallery", getContentFromInit: getContentFromRaw, getContentFromRaw
    });

    return <>
        {items.map(item => <GalleryPic key={item.id} slug={item.slug} title={item.title} image={item.image} />)}
        {items.length === 0 && <div className={styles.emp}>No photos this year</div>}
        {hasMore && <div className={styles.spb}><SpinnerButton loading={loading} onClick={handleFetchMore}>Load more</SpinnerButton></div>}
    </>
}

const getContentFromRaw : GetContentFromRaw<GalleryEvent, GalleryEventPic> = (info) => {
    const {entries, year, batchSize} = info;

    if (entries.length === 0) 
        return {
            lastDate: '',
            lastId: '',
            items: [],
            hasMore: false,
            year
        }
    
    const lastEntry : GalleryEvent = entries[entries.length - 1];

    return {
        lastDate: lastEntry.date,
        lastId: lastEntry._id,
        hasMore: entries.length === batchSize,
        year,
        items: entries
            .map(entry => {
                const pics : GalleryEventPic[] = [];
                entry.gallery.forEach((image, i) => {
                    pics.push({
                        image,
                        title: entry.title,
                        slug: `/${entry._type}/${entry.slug}`,
                        id: `${entry._type}${entry.slug}${i}`
                    });
                });
                return pics;
            })
            .flat(1)
    }
};
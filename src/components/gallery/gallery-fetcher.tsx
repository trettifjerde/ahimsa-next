'use client'

import { SpinnerButton } from "../ui/buttons";
import useBatchFetcher, { GetContentFromRaw, RawInfo } from "@/hooks/useBatchFetcher";
import { GalleryEvent, GalleryEventPic } from "@/sanity/lib/types";
import gridStyles from './gallery-grid.module.css';
import fetcherStyles from '@/components/ui/year/layout/year-fetcher.module.css';
import { makeGalleryPics } from "@/utils/serverHelpers";
import GalleryViewer from "./gallery-viewer";

type GalleryInitInfo = RawInfo<GalleryEvent>;

export default function GalleryFetcher({initInfo}: {initInfo: GalleryInitInfo}) {

    const {loading, hasMore, items, handleFetchMore} = useBatchFetcher<GalleryInitInfo, GalleryEvent, GalleryEventPic>({
        initInfo, url: "/gallery", getContentFromInit: getContentFromRaw, getContentFromRaw
    });

    return <>
        <GalleryViewer pics={items} emptyClass={gridStyles.emp}/>
        {hasMore && <div className={fetcherStyles.spb}><SpinnerButton loading={loading} onClick={handleFetchMore}>Load more</SpinnerButton></div>}
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
            .map(entry => makeGalleryPics(entry))
            .flat(1)
    }
};
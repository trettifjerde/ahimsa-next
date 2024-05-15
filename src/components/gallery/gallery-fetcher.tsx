'use client'

import { SpinnerButton } from "../ui/buttons";
import useBatchFetcher, { GetContentFromInit, GetContentFromRaw, RawInfo } from "@/hooks/useBatchFetcher";
import { GalleryEvent, GalleryEventPic } from "@/sanity/lib/types";
import gridStyles from './gallery-grid.module.css';
import fetcherStyles from '@/components/ui/year/layout/year-fetcher.module.css';
import { makeGalleryPics } from "@/utils/serverHelpers";
import GalleryViewer from "./gallery-viewer";
import { getYearStateKey } from "@/utils/clientHelpers";
import { useEffect } from "react";

type GalleryInitInfo = RawInfo<GalleryEvent>;

export default function GalleryFetcher({initInfo}: {initInfo: GalleryInitInfo}) {

    const {state, dispatch, handleFetchMore} = useBatchFetcher<GalleryInitInfo, GalleryEvent, GalleryEventPic>({
        initInfo, url: "/gallery", getContentFromInit, getContentFromRaw
    });

    const {hasMore, items} = state.years[state.selectedYear];

    useEffect(() => {
        const yearContent = getContentFromRaw(initInfo);
        dispatch({type: 'setYear', yearContent});
    }, [initInfo]);

    return <>
        <GalleryViewer pics={items} emptyClass={gridStyles.emp}/>
        {hasMore && <div className={fetcherStyles.spb}><SpinnerButton loading={state.loading} onClick={handleFetchMore}>Load more</SpinnerButton></div>}
    </>
}

const getContentFromRaw : GetContentFromRaw<GalleryEvent, GalleryEventPic> = (info) => {
    const {entries, year, batchSize} = info;

    if (entries.length === 0) 
        return {
            lastDate: '',
            items: [],
            hasMore: false,
            year
        }
    
    const lastEntry : GalleryEvent = entries[entries.length - 1];

    return {
        lastDate: lastEntry.date,
        hasMore: entries.length === batchSize,
        year,
        items: entries
            .map(entry => makeGalleryPics(entry))
            .flat(1)
    }
};

const getContentFromInit : GetContentFromInit<GalleryInitInfo, GalleryEventPic> = (info) => {
    const year = getYearStateKey(info.year);
    const yearContent = getContentFromRaw(info);
    return {years: {[year]: yearContent}, selectedYear: year}
}
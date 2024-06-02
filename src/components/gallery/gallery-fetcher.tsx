'use client'

import { SpinnerButton } from "../ui/buttons";
import gridStyles from './gallery-grid.module.css';
import fetcherStyles from '@/components/ui/year/layout/year-fetcher.module.css';
import GalleryViewer from "./gallery-viewer";
import { useContext, useEffect } from "react";
import { YearContent } from "@/utils/types";
import { GalleryContext } from "./gallery-context";
import { GalleryEventPic } from "@/sanity/lib/types";

export default function GalleryFetcher({ initInfo }: { initInfo: YearContent<GalleryEventPic> }) {

    const { state, dispatch, handleFetchMore } = useContext(GalleryContext);

    const { hasMore, items } = state.years[state.selectedYear] || {items: [], hasMore: false};

    useEffect(() => {
        dispatch({ type: 'setYear', yearContent: initInfo });
    }, [initInfo]);

    return <>
        <GalleryViewer pics={items} emptyClass={gridStyles.emp} />

        {hasMore && <div className={fetcherStyles.spb}>
            <SpinnerButton loading={state.loading} onClick={handleFetchMore}>Load more</SpinnerButton>
        </div>}
    </>
}
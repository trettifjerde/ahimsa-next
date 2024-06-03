'use client'

import { useContext, useEffect, useMemo } from "react";
import { GalleryEventPic } from "@/sanity/lib/types";
import { YearContent } from "@/utils/types";
import { SpinnerButton } from "../ui/buttons";
import GalleryViewer from "./gallery-viewer";
import { GalleryContext } from "./gallery-context";
import fetcherStyles from '@/components/ui/year/layout/year-fetcher.module.css';
import gridStyles from './gallery-grid.module.css';

export default function GalleryFetcher({ initInfo }: { initInfo: YearContent<GalleryEventPic> }) {

    const { state, selectYear, handleFetchMore } = useContext(GalleryContext);

    const { hasMore, items } = state.years[state.selectedYear] || {items: [], hasMore: initInfo.hasMore};

    const pics = useMemo(() => {
        return [...initInfo.items, ...items];
    }, [initInfo, items]);

    useEffect(() => {
        selectYear(initInfo);
    }, [initInfo]);

    return <>
        <GalleryViewer pics={pics} emptyClass={gridStyles.emp} />

        {hasMore && <div className={fetcherStyles.spb}>
            <SpinnerButton loading={state.loading} onClick={handleFetchMore}>Load more</SpinnerButton>
        </div>}
    </>
}
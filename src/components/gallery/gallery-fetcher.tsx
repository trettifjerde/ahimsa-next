'use client'

import { useContext, useEffect, useMemo } from "react";
import { GalleryEventPic } from "@/sanity/lib/types";
import { FetcherEntry } from "@/utils/types";
import GalleryViewer from "./gallery-viewer";
import gridStyles from './gallery-grid.module.css';
import FetchButton from "../ui/list/fetch-button/fetch-button";
import GalleryContext from "./gallery-context";

export default function GalleryFetcher({ initInfo }: { initInfo: FetcherEntry<GalleryEventPic> }) {

    const { state, selectKey, handleFetchMore } = useContext(GalleryContext);

    const { hasMore, items } = state.entries[state.selectedKey] || {items: [], hasMore: initInfo.hasMore};

    const pics = useMemo(() => {
        return [...initInfo.items, ...items];
    }, [initInfo, items]);

    useEffect(() => {
        selectKey(initInfo);
    }, [initInfo]);

    return <>
        <GalleryViewer pics={pics} emptyClass={gridStyles.emp} />

        {hasMore && <FetchButton loading={state.loading} fetchMore={handleFetchMore} />}
    </>
}
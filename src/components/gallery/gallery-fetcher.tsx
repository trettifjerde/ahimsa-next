'use client'

import { useMemo } from "react";
import { GalleryEntryPic } from "@/sanity/lib/types";
import { FetcherEntryMeta } from "@/utils/types";
import GalleryViewer from "./gallery-viewer";
import gridStyles from './gallery-grid.module.css';
import FetchButton from "../ui/list/fetch-button/fetch-button";
import GalleryContext from "./gallery-context";
import useFetcherContextConsumer from "@/hooks/useContextConsumer";

export default function GalleryFetcher({ initInfo, initItems }: { 
    initInfo: FetcherEntryMeta, 
    initItems: GalleryEntryPic[] 
}) {

    const { state, handleFetchMore } = useFetcherContextConsumer(GalleryContext, initInfo);
    const { loading, errorMsg, items, hasMore } = state;

    const pics = useMemo(() => {
        return [...initItems, ...items];
    }, [items]);

    return <>
        <GalleryViewer pics={pics} emptyClass={gridStyles.emp} />

        {hasMore && <FetchButton loading={loading} fetchMore={handleFetchMore} />}
    </>
}
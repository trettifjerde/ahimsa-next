'use client'

import { MouseEventHandler, ReactNode, createContext } from "react";
import useBatchFetcher, { FetcherState, initBatchFetcherReducer } from "@/hooks/useBatchFetcher";
import { GalleryEventPic } from "@/sanity/lib/types";
import { YearMeta } from "@/utils/types";

export const GalleryContext = createContext<{
    state: FetcherState<GalleryEventPic>,
    selectYear: (info: YearMeta) => void,
    handleFetchMore: MouseEventHandler
}>({
    state: initBatchFetcherReducer(),
    selectYear: () => {},
    handleFetchMore: () => { }
});

export default function GalleryContextProvider({ children }: { children: ReactNode }) {
    const { state, selectYear, handleFetchMore } = useBatchFetcher<GalleryEventPic>("/gallery");

    return <GalleryContext.Provider value={{ state, selectYear, handleFetchMore }}>
        {children}
    </GalleryContext.Provider>
}
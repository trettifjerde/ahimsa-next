'use client'

import { Dispatch, MouseEventHandler, ReactNode, createContext } from "react";
import useBatchFetcher, { FetcherAction, FetcherState, initBatchFetcherReducer } from "@/hooks/useBatchFetcher";
import { GalleryEvent, GalleryEventPic } from "@/sanity/lib/types";
import { makeGalleryPics } from "@/utils/clientHelpers";

export const GalleryContext = createContext<{
    state: FetcherState<GalleryEventPic>,
    dispatch: Dispatch<FetcherAction<GalleryEventPic>>,
    handleFetchMore: MouseEventHandler
}>({
    state: initBatchFetcherReducer(),
    dispatch: () => { },
    handleFetchMore: () => { }
});

export default function GalleryContextProvider({ children }: { children: ReactNode }) {
    const { state, dispatch, handleFetchMore } = useBatchFetcher<GalleryEvent, GalleryEventPic>({
        url: "/gallery", prepareItems: makeGalleryPics
    });

    return <GalleryContext.Provider value={{ state, dispatch, handleFetchMore }}>
        {children}
    </GalleryContext.Provider>
}
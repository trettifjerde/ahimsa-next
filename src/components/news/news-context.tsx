'use client'

import { MouseEventHandler, ReactNode, createContext } from "react";
import useBatchFetcher, { FetcherState, initBatchFetcherReducer } from "@/hooks/useBatchFetcher";
import { NewsListPreviewItem as News } from "@/sanity/lib/types";
import { YearMeta } from "@/utils/types";

export const NewsContext = createContext<{
    state: FetcherState<News>,
    selectYear: (info: YearMeta) => void,
    handleFetchMore: MouseEventHandler
}>({
    state: initBatchFetcherReducer(),
    selectYear: () => {},
    handleFetchMore: () => { }
});

export default function NewsGeneralLayout({ children }: { children: ReactNode }) {
    const { state, selectYear, handleFetchMore } = useBatchFetcher<News>("/news");

    return <NewsContext.Provider value={{ state, selectYear, handleFetchMore }}>
        {children}
    </NewsContext.Provider>
}
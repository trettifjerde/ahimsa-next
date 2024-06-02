'use client'

import { Dispatch, MouseEventHandler, ReactNode, createContext } from "react";
import useBatchFetcher, { FetcherAction, FetcherState, PrepareItems, initBatchFetcherReducer } from "@/hooks/useBatchFetcher";
import { NewsListPreviewItem as News } from "@/sanity/lib/types";

export const NewsContext = createContext<{
    state: FetcherState<News>,
    dispatch: Dispatch<FetcherAction<News>>,
    handleFetchMore: MouseEventHandler
}>({
    state: initBatchFetcherReducer(),
    dispatch: () => { },
    handleFetchMore: () => { }
});

export default function NewsGeneralLayout({ children }: { children: ReactNode }) {
    const { state, dispatch, handleFetchMore } = useBatchFetcher<News, News>({
        url: "/news", prepareItems
    });

    return <NewsContext.Provider value={{ state, dispatch, handleFetchMore }}>
        {children}
    </NewsContext.Provider>
}

const prepareItems: PrepareItems<News, News> = (news) => {
    return news;
}
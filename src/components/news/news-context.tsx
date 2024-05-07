'use client'

import useBatchFetcher, { FetcherAction, FetcherState, GetContentFromInit, GetContentFromRaw } from "@/hooks/useBatchFetcher";
import { NewsListQueryResult } from "../../../sanity.types";
import { Dispatch, MouseEventHandler, ReactNode, createContext } from "react";

type NewsInitInfo = {batchSize: number};
type News = Exclude<NewsListQueryResult, null>[0];

export const NewsContext = createContext<{
    state: FetcherState<News>, 
    dispatch: Dispatch<FetcherAction<News>>, 
    handleFetchMore: MouseEventHandler}>({
    state: {
        loading: false,
        errorMsg: '',
        selectedYear: '',
        years: {}
    },
    dispatch: () => {},
    handleFetchMore: () => {}
});

export default function NewsGeneralLayout({batchSize, children}: {batchSize: number, children: ReactNode}) {
    const {state, dispatch, handleFetchMore} = useBatchFetcher<NewsInitInfo, News, News>({
        initInfo: {batchSize}, url: "/news", getContentFromInit, getContentFromRaw
    });

    return <NewsContext.Provider value={{state, dispatch, handleFetchMore}}>
        {children}
    </NewsContext.Provider>
}

const getContentFromInit : GetContentFromInit<NewsInitInfo, News> = (info) => {
    return {
        selectedYear: '',
        years: {}
    }
}

const getContentFromRaw : GetContentFromRaw<News, News> = (info) => {

    const {batchSize, entries, year} = info;

    if (entries.length === 0) 
        return {
            lastDate: '',
            lastId: '',
            items: [],
            hasMore: false,
            year
        }
    
    const lastEntry : News = entries[entries.length - 1];

    return {
        lastDate: lastEntry.date,
        lastId: lastEntry._id,
        hasMore: entries.length === batchSize,
        year,
        items: entries
    }
}
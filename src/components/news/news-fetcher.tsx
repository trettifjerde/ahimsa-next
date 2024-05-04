'use client'

import NewsItemPreview from "./news-prev";
import { SpinnerButton } from "../ui/buttons";
import useBatchFetcher, {  GetContentFromInit, GetContentFromRaw, RawInfo } from "@/hooks/useBatchFetcher";
import { NewsListQueryResult } from "../../../sanity.types";

type NewsInitInfo = {batchSize: number, hasMore: boolean, year?: string, lastDate: string, lastId: string};
type News = Exclude<NewsListQueryResult, null>[0];

export default function NewsFetcher({initInfo}: {initInfo: NewsInitInfo}) {

    const {loading, hasMore, items, handleFetchMore} = useBatchFetcher<NewsInitInfo, News, News>({
        initInfo, url: "/news", getContentFromInit, getContentFromRaw
    });

    return <>
        {items.map(item => <NewsItemPreview key={item.slug} item={item} />)}
        {hasMore && <SpinnerButton loading={loading} onClick={handleFetchMore}>Load more</SpinnerButton>}
    </>
}

const getContentFromInit : GetContentFromInit<NewsInitInfo, News> = (info) => {
    const {lastDate, lastId, hasMore, year} = info;

    return {
        items: [],
        hasMore,
        year,
        lastDate,
        lastId
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
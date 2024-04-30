'use client'

import { ReactNode } from "react";
import NewsItemPreview from "./news-prev";
import { SpinnerButton } from "../ui/buttons";
import useBatchFetcher, { YearMeta } from "@/hooks/useBatchFetcher";
import { NewsListQueryResult } from "../../../sanity.types";

type News = Exclude<NewsListQueryResult, null>[0];

export default function NewsGrid({batchSize, children, yearMeta, url}: {
    batchSize: number, yearMeta: YearMeta, url: string, children: ReactNode
}) {

    const {loading, hasMore, items, handleFetchMore} = useBatchFetcher<News>({batchSize, yearMeta, url});

    return <>
        {children}
        {items.map(item => <NewsItemPreview key={item.slug} item={item} />)}
        {hasMore && <SpinnerButton loading={loading} onClick={handleFetchMore}>Load more</SpinnerButton>}
    </>
}
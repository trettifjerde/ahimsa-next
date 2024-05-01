'use client'

import NewsItemPreview from "./news-prev";
import { SpinnerButton } from "../ui/buttons";
import useBatchFetcher, { YearMeta } from "@/hooks/useBatchFetcher";
import { NewsListQueryResult } from "../../../sanity.types";

type News = Exclude<NewsListQueryResult, null>[0];

export default function NewsFetcher({batchSize, yearMeta}: {batchSize: number, yearMeta: YearMeta}) {

    const {loading, hasMore, items, handleFetchMore} = useBatchFetcher<News>({batchSize, yearMeta, url: "/news"});

    return <>
        {items.map(item => <NewsItemPreview key={item.slug} item={item} />)}
        {hasMore && <SpinnerButton loading={loading} onClick={handleFetchMore}>Load more</SpinnerButton>}
    </>
}
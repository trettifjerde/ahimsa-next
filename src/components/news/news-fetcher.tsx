'use client'

import { FetcherEntryMeta } from "@/utils/types";
import NewsItemPreview from "./news-prev";
import FetchButton from "../ui/list/fetch-button/fetch-button";
import NewsContext from "./news-context";
import useFetcherContextConsumer from "@/hooks/useContextConsumer";

export default function NewsFetcher({initInfo}: {initInfo: FetcherEntryMeta}) {

    const {state, handleFetchMore} = useFetcherContextConsumer(NewsContext, initInfo);

    return <>
        {state.items.map(item => <NewsItemPreview key={item.slug} item={item} />)}
        
        {state.hasMore && <FetchButton loading={state.loading} fetchMore={handleFetchMore} />}
    </>
}
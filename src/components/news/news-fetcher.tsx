'use client'

import { useContext, useEffect } from "react";
import { FetcherEntryMeta } from "@/utils/types";
import NewsItemPreview from "./news-prev";
import FetchButton from "../ui/list/fetch-button/fetch-button";
import NewsContext from "./news-context";

export default function NewsFetcher({initInfo}: {initInfo: FetcherEntryMeta}) {

    const {state, selectKey, handleFetchMore} = useContext(NewsContext);

    const {items, hasMore} = state.entries[state.selectedKey] || {items: [], hasMore: initInfo.hasMore};

    useEffect(() => {
        selectKey(initInfo);
    }, [initInfo]);

    return <>
        {items.map(item => <NewsItemPreview key={item.slug} item={item} />)}
        
        {hasMore && <FetchButton loading={state.loading} fetchMore={handleFetchMore} />}
    </>
}
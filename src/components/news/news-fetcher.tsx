'use client'

import { useContext, useEffect } from "react";
import { YearMeta } from "@/utils/types";
import { SpinnerButton } from "../ui/buttons";
import { NewsContext } from "./news-context";
import NewsItemPreview from "./news-prev";
import fetcherStyles from '@/components/ui/year/layout/year-fetcher.module.css';

export default function NewsFetcher({initInfo}: {initInfo: YearMeta}) {

    const {state, dispatch, handleFetchMore} = useContext(NewsContext);

    const {items, hasMore} = state.years[state.selectedYear] || {items: [], hasMore: false};

    useEffect(() => {
        console.log('news fetcher: init info changed');
        dispatch({type: 'setYear', yearContent: {...initInfo, items: []}})
    }, [initInfo]);

    return <>
        {items.map(item => <NewsItemPreview key={item.slug} item={item} />)}
        
        {hasMore && <div className={fetcherStyles.spb}>
            <SpinnerButton loading={state.loading} onClick={handleFetchMore}>Load more</SpinnerButton>
        </div>}
    </>
}
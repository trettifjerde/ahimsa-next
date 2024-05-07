'use client'

import NewsItemPreview from "./news-prev";
import { SpinnerButton } from "../ui/buttons";
import fetcherStyles from '@/components/ui/year/layout/year-fetcher.module.css';
import { useContext, useEffect } from "react";
import { NewsContext } from "./news-context";

type NewsInitInfo = {batchSize: number, hasMore: boolean, year?: string, lastDate: string, lastId: string};

export default function NewsFetcher({initInfo}: {initInfo: NewsInitInfo}) {

    const {state, dispatch, handleFetchMore} = useContext(NewsContext);

    const {items, hasMore} = state.years[state.selectedYear] || {items: [], hasMore: false};

    useEffect(() => {
        const {year, hasMore, lastDate, lastId} = initInfo;
        dispatch({type: 'setYear', yearContent: {
            year,
            hasMore, 
            lastDate,
            lastId,
            items: []
        }})
    }, [initInfo]);

    return <>
        {items.map(item => <NewsItemPreview key={item.slug} item={item} />)}
        {hasMore && <div className={fetcherStyles.spb}>
            <SpinnerButton loading={state.loading} onClick={handleFetchMore}>Load more</SpinnerButton>
        </div>}
    </>
}
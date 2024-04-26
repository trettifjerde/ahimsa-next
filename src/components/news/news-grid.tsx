'use client'

import { MouseEventHandler, ReactNode, useReducer } from "react";
import NewsItemPreview from "./news-prev";
import { NewsListQueryResult } from "../../../sanity.types";
import { SpinnerButton } from "../ui/buttons";
import { fetchData } from "@/utils/clientHelpers";

export default function NewsGrid({
    hasMore, batchSize, children, lastDate, lastId, year
}: Props) {

    console.log('News Grid', 'hasMore', hasMore, 'batchSize', batchSize, 'lastDate', lastDate, 'lastId', lastId);

    const [state, dispatch] = useReducer(reducer, { batchSize, lastDate, lastId, hasMore }, initReducer);

    const handleFetchMore: MouseEventHandler<HTMLButtonElement> = async (e) => {
        dispatch({type: 'fetchStart'});

        const params = new URLSearchParams({lastDate, lastId});
        if (year)
            params.set('year', year);

        const res = await fetchData<News[]>(`/api/news?${params.toString()}`);

        if (res.failed)
            dispatch({type: 'error', message: res.data})

        else
            dispatch({type: 'success', news: res.data});
    };

    return <>
        {children}
        {state.news.map(item => <NewsItemPreview key={item.slug} news={item} />)}
        {state.hasMore && <SpinnerButton loading={state.loading} onClick={handleFetchMore}>Load more</SpinnerButton>}
    </>
}

function initReducer({batchSize, lastDate, lastId, hasMore}: {
    batchSize: number, lastDate: string, lastId: string, hasMore: boolean
}) : FetcherState {
    return {
        batchSize,
        lastDate,
        lastId,
        hasMore,
        news: [],
        loading: false,
        errorMsg: ''
    }
}

function reducer(state: FetcherState, action: FetcherAction) {
    switch (action.type) {
        case 'fetchStart':
            return { ...state, loading: true, errorMsg: '' };

        case 'success':

            if (action.news.length === 0)
                return {
                    ...state,
                    loading: false,
                    hasMore: false
                }

            else {
                const lastNews = action.news[action.news.length - 1];

                return {
                    ...state,
                    loading: false,
                    news: [...state.news, ...action.news],
                    hasMore: action.news.length === state.batchSize,
                    lastId: lastNews._id,
                    lastDate: lastNews.date
                }
            }

        case 'error':
            return {...state, loading: false, errorMsg: action.message};

        default:
            return state;
    }
}

type News = Exclude<NewsListQueryResult, null>[0];
type Props = {
    hasMore: boolean,
    batchSize: number,
    children: ReactNode,
    lastDate: string,
    lastId: string,
    year?: string
}

type FetcherState = {
    batchSize: number,
    news: News[],
    lastId: string,
    lastDate: string,
    loading: boolean,
    hasMore: boolean,
    errorMsg: string
}

type FetcherAction = { type: 'fetchStart' } | { type: 'success', news: News[] } | { type: 'error', message: string };
'use client'

import { MouseEventHandler, ReactNode, useEffect, useReducer } from "react";
import NewsItemPreview from "./news-prev";
import { NewsListQueryResult } from "../../../sanity.types";
import { SpinnerButton } from "../ui/buttons";
import { fetchData } from "@/utils/clientHelpers";
import styles from './news-grid.module.css';

export default function NewsGrid({batchSize, children, yearInfo, year}: ComponentProps) {

    const [state, dispatch] = useReducer(reducer, { batchSize, yearInfo, year }, initReducer);

    const { hasMore, news } = state.years[state.selectedYear];

    const handleFetchMore: MouseEventHandler<HTMLButtonElement> = async (e) => {
        dispatch({type: 'fetchStart'});

        const { lastDate, lastId } = state.years[state.selectedYear];

        const params = new URLSearchParams({lastDate, lastId, year: state.selectedYear});

        const res = await fetchData<News[]>(`/api/news?${params.toString()}`);

        if (res.failed)
            dispatch({type: 'error', message: res.data})

        else
            dispatch({type: 'success', news: res.data, year});
    };

    useEffect(() => {
        dispatch({type: 'setYear', year, yearInfo})
    }, [yearInfo, year]);

    return <div className={styles.g}>
        {children}
        {news.map(item => <NewsItemPreview key={item.slug} news={item} />)}
        {hasMore && <SpinnerButton loading={state.loading} onClick={handleFetchMore}>Load more</SpinnerButton>}
    </div>
}

function initReducer({batchSize, yearInfo, year}: {
    batchSize: number, yearInfo: YearInfo, year?: string}) : FetcherState {

    const selectedYear = getYearStateKey(year);
    
    const years = { 
        [selectedYear] : makeFullYearInfo(yearInfo)
    };

    return {
        batchSize,
        loading: false,
        errorMsg: '',
        selectedYear,
        years
    }
}

function reducer(state: FetcherState, action: FetcherAction) {
    switch (action.type) {
        case 'setYear':

            const yearKey = getYearStateKey(action.year);
            const updState = {
                ...state,
                errorMsg: '',
                selectedYear: yearKey,
            }

            if (yearKey in state.years)
                return updState;

            else {
                updState.years = {...state.years, [yearKey]: makeFullYearInfo(action.yearInfo)};
                return updState;
            }

        case 'fetchStart':
            return { ...state, loading: true, errorMsg: '' };

        case 'success':

            const curYear = getYearStateKey(action.year);
            const lastNews : News | undefined = action.news[action.news.length - 1];

            if (lastNews)
            
                return {
                    ...state,
                    loading: false,
                    years: {...state.years, [curYear]: {
                        news: [...state.years[curYear].news, ...action.news],
                        hasMore: action.news.length === state.batchSize,
                        lastId: lastNews._id,
                        lastDate: lastNews.date
                    }}
                }

            else 
                return {
                    ...state,
                    loading: false,
                    years: {
                        ...state.years,
                        [curYear]: {
                            ...state.years[curYear],
                            hasMore: false
                        }
                    }
            }

        case 'error':
            return {...state, loading: false, errorMsg: action.message};

        default:
            return state;
    }
}

function getYearStateKey(year?: string) {
    return year || 'all';
}

function makeFullYearInfo(info: YearInfo) {
    return {...info, news: []} as YearNews;
}

function updateYearNews(info: YearNews, batch: News[]) {

}

type News = Exclude<NewsListQueryResult, null>[0];

type YearInfo = { 
    hasMore: boolean,
    lastDate: string,
    lastId: string,
};

type YearNews = YearInfo & {news: News[]};

type ComponentProps = {
    batchSize: number,
    yearInfo: YearInfo,
    children: ReactNode,
    year?: string,
};

type FetcherState = {
    batchSize: number,
    errorMsg: string,
    loading: boolean,
    selectedYear: string,
    years: {
        [key: string]: YearNews
    },
}

type FetcherAction = { type: 'fetchStart' } | 
    { type: 'success', news: News[], year?: string } | 
    { type: 'error', message: string } | 
    { type: 'setYear', year?: string, yearInfo: YearInfo};
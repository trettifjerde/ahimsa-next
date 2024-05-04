import { fetchData } from "@/utils/clientHelpers";
import { MouseEventHandler, useEffect, useReducer } from "react";

export default function useBatchFetcher<II extends InitInfo , RawItem extends YearItem, Item>({
    initInfo, url, getContentFromInit, getContentFromRaw
}: { 
    initInfo: II, url: string, getContentFromInit: GetContentFromInit<II, Item>, getContentFromRaw: GetContentFromRaw<RawItem, Item>
}) {

    const [state, dispatch] = useReducer(reducer<Item>, {initInfo, getContentFromInit}, initReducer<II, Item>);

    const { hasMore, items } = state.years[state.selectedYear];

    const handleFetchMore: MouseEventHandler<HTMLButtonElement> = async (e) => {
        dispatch({ type: 'fetchStart' });

        const { lastDate, lastId, year } = state.years[state.selectedYear];

        const params = new URLSearchParams({ lastDate, lastId, year: state.selectedYear });

        const res = await fetchData<RawItem[]>(`/api${url}?${params.toString()}`);

        if (res.failed)
            dispatch({ type: 'error', message: res.data })

        else 
            dispatch({ 
                type: 'addItems', 
                yearContent: getContentFromRaw({
                    entries: res.data,
                    batchSize: initInfo.batchSize,
                    year})
            });
    };

    useEffect(() => {
        dispatch({ type: 'setYear', yearContent: getContentFromInit(initInfo) })
    }, [initInfo]);

    return { hasMore, items, handleFetchMore, loading: state.loading };
}

export function initReducer<II extends InitInfo, Item>({initInfo, getContentFromInit}: {
    initInfo: II, getContentFromInit: GetContentFromInit<II, Item>}): FetcherState<Item> {

    const yearContent = getContentFromInit(initInfo);
    const selectedYear = getYearStateKey(yearContent.year);

    const years = {
        [selectedYear]: yearContent
    };

    return {
        loading: false,
        errorMsg: '',
        selectedYear,
        years
    }
}

export function reducer<T>(state: FetcherState<T>, action: FetcherAction<T>) {
    switch (action.type) {
        case 'setYear':

            const yearKey = getYearStateKey(action.yearContent.year);

            return {
                ...state,
                loading: false,
                errorMsg: '',
                selectedYear: yearKey,
                years: (yearKey in state.years) ? state.years : {
                    ...state.years,
                    [yearKey] : action.yearContent
                }
            }

        case 'fetchStart':
            return { ...state, loading: true, errorMsg: '' };

        case 'addItems':

            const {items, year, hasMore, lastDate, lastId} = action.yearContent;
            const curYear = getYearStateKey(year);
            const curYearItems = state.years[curYear].items;

            return {
                ...state,
                loading: false,
                errorMsg: '',
                years: {
                    ...state.years,
                    [curYear] : {
                        year,
                        hasMore,
                        lastDate,
                        lastId,
                        items: items.length === 0 ? curYearItems : [...curYearItems, ...items]
                    }
                }
            }

        case 'error':
            return { ...state, loading: false, errorMsg: action.message };

        default:
            return state;
    }
}

function getYearStateKey(year?: string) {
    return year || 'all';
}

export type InitInfo = {batchSize: number};

export type RawInfo<R> = { batchSize: number, entries: R[], year?: string};

export type GetContentFromInit<II, I> = (initInfo: II) => YearContent<I>;

export type GetContentFromRaw<R, I> = (info: RawInfo<R>) => YearContent<I>;

export type YearItem = { _id: string, date: string };

export type YearMeta = {
    year?: string,
    hasMore: boolean,
    lastDate: string,
    lastId: string,
};

type YearContent<T> = YearMeta & { items: T[] };

type FetcherState<T> = {
    errorMsg: string,
    loading: boolean,
    selectedYear: string,
    years: {
        [key: string]: YearContent<T>
    },
}

type FetcherAction<T> = { type: 'fetchStart' } |
{ type: 'addItems', yearContent: YearContent<T>} |
{ type: 'error', message: string } |
{ type: 'setYear', yearContent: YearContent<T> };
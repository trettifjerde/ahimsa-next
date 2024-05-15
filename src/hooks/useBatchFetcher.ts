import { fetchData, getYearStateKey } from "@/utils/clientHelpers";
import { MouseEventHandler, useReducer } from "react";

export default function useBatchFetcher<II extends InitInfo , RawItem extends YearItem, Item>({
    initInfo, url, getContentFromInit, getContentFromRaw
}: { 
    initInfo: II, url: string, getContentFromInit: GetContentFromInit<II, Item>, getContentFromRaw: GetContentFromRaw<RawItem, Item>
}) {

    const [state, dispatch] = useReducer(reducer<Item>, {initInfo, getContentFromInit}, initReducer<II, Item>);

    const handleFetchMore: MouseEventHandler<HTMLButtonElement> = async (e) => {
        dispatch({ type: 'fetchStart' });

        const { lastDate, year } = state.years[state.selectedYear];

        const params = new URLSearchParams({ lastDate, year: state.selectedYear });

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

    return { state, dispatch, handleFetchMore };
}

export function initReducer<II extends InitInfo, Item>({initInfo, getContentFromInit}: {
    initInfo: II, getContentFromInit: GetContentFromInit<II, Item>}): FetcherState<Item> {

    const {selectedYear, years} = getContentFromInit(initInfo);

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

            const {items, year, hasMore, lastDate} = action.yearContent;
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

export type InitInfo = {batchSize: number};

export type RawInfo<R> = { batchSize: number, entries: R[], year?: string};

export type GetContentFromInit<I, T> = (initInfo: I) => {selectedYear: string, years: {
    [key: string]: YearContent<T>
}};

export type GetContentFromRaw<R, I> = (info: RawInfo<R>) => YearContent<I>;

export type YearItem = { date: string };

export type YearMeta = {
    year?: string,
    hasMore: boolean,
    lastDate: string
};

type YearContent<T> = YearMeta & { items: T[] };

export type FetcherState<T> = {
    errorMsg: string,
    loading: boolean,
    selectedYear: string,
    years: {
        [key: string]: YearContent<T>
    },
}

export type FetcherAction<T> = { type: 'fetchStart' } |
{ type: 'addItems', yearContent: YearContent<T>} |
{ type: 'error', message: string } |
{ type: 'setYear', yearContent: YearContent<T> };
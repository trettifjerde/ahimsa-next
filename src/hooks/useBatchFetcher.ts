import { MouseEventHandler, useReducer } from "react";
import { fetchData, getYearStateKey } from "@/utils/clientHelpers";
import { BatchFetcherResponse, BatchFetcherItem as Item, YearContent, YearMeta } from "@/utils/types";

export default function useBatchFetcher<R extends Item, I extends Item>({url, prepareItems
}: { 
    url: string, prepareItems: PrepareItems<R, I>
}) {

    const [state, dispatch] = useReducer(reducer<I>, null, initBatchFetcherReducer<I>);

    const handleFetchMore: MouseEventHandler<HTMLButtonElement> = async (e) => {
        dispatch({ type: 'fetchStart' });
        
        const { lastDate, year } = state.years[state.selectedYear];

        const params = new URLSearchParams({ lastDate, year: state.selectedYear});

        const res = await fetchData<BatchFetcherResponse<R>>(`/api${url}?${params.toString()}`);

        if (res.failed)
            dispatch({ type: 'error', message: res.data })

        else 
            dispatch({ 
                type: 'addItems', 
                yearUpdate: {
                    items: prepareItems(res.data.items),
                    hasMore: res.data.hasMore,
                    year
                }
            });
    };

    return { state, dispatch, handleFetchMore };
}

export function initBatchFetcherReducer<I extends Item>(): FetcherState<I> {

    return {
        loading: false,
        errorMsg: '',
        selectedYear: '',
        years: {}
    }
}

export function reducer<I extends Item>(state: FetcherState<I>, action: FetcherAction<I>) {
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
                    [yearKey] : {
                        ...action.yearContent,
                    }
                }
            }

        case 'fetchStart':
            return { ...state, loading: true, errorMsg: '' };

        case 'addItems':

            const {items, year, hasMore} = action.yearUpdate;
            const curYear = getYearStateKey(year);
            const curYearInfo = state.years[curYear];

            const [updLastDate, updItems] = items.length === 0 ? [curYearInfo.lastDate, curYearInfo.items] : [
                items[items.length - 1].date, [...curYearInfo.items, ...items]
            ];

            return {
                ...state,
                loading: false,
                errorMsg: '',
                years: {
                    ...state.years,
                    [curYear] : {
                        year,
                        hasMore,
                        lastDate: updLastDate,
                        items: updItems
                    }
                }
            }

        case 'error':
            return { ...state, loading: false, errorMsg: action.message };

        default:
            return state;
    }
}

export type PrepareItems<R extends Item, I extends Item> = (info: R[]) => I[];

export type FetcherState<I extends Item> = {
    errorMsg: string,
    loading: boolean,
    selectedYear: string,
    years: {
        [key: string]: YearContent<I>
    },
}

export type FetcherAction<I extends Item> = { type: 'fetchStart' } |
{ type: 'addItems', yearUpdate: {items: I[], hasMore: boolean, year: number | null}} |
{ type: 'error', message: string } |
{ type: 'setYear', yearContent: YearContent<I> };
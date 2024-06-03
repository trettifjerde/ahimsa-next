import { MouseEventHandler, useReducer } from "react";
import { fetchData, getYearStateKey } from "@/utils/clientHelpers";
import { YearContent, YearMeta } from "@/utils/types";

export default function useBatchFetcher<I>(url: string) {

    const [state, dispatch] = useReducer(reducer<I>, null, initBatchFetcherReducer<I>);

    const selectYear = (info: YearMeta) => {
        dispatch({type: 'selectYear', yearMeta: info});
    };

    const handleFetchMore: MouseEventHandler<HTMLButtonElement> = async (e) => {
        dispatch({ type: 'fetchStart' });
        
        const { lastDate } = state.years[state.selectedYear];

        const params = new URLSearchParams({ lastDate, year: state.selectedYear});

        const res = await fetchData<YearContent<I>>(`/api${url}?${params.toString()}`);

        if (res.failed)
            dispatch({ type: 'error', message: res.data })

        else 
            dispatch({ 
                type: 'addItems', 
                yearContent: res.data
            });
    };

    return { state, selectYear, handleFetchMore };
}

export function initBatchFetcherReducer<I>(): FetcherState<I> {

    return {
        loading: false,
        errorMsg: '',
        selectedYear: '',
        years: {}
    }
}

export function reducer<I>(state: FetcherState<I>, action: FetcherAction<I>) {
    switch (action.type) {
        case 'selectYear':
            const yearKey = getYearStateKey(action.yearMeta.year);

            return {
                ...state,
                loading: false,
                errorMsg: '',
                selectedYear: yearKey,
                years: (yearKey in state.years) ? state.years : {
                    ...state.years,
                    [yearKey] : {
                        ...action.yearMeta,
                        items: []
                    }
                }
            }

        case 'fetchStart':
            return { ...state, loading: true, errorMsg: '' };

        case 'addItems':
            const {items : itemsBatch, year, hasMore, lastDate} = action.yearContent;
            const curYear = getYearStateKey(year);
            const curYearInfo = state.years[getYearStateKey(year)];

            const items = itemsBatch.length === 0 ? curYearInfo.items : [...curYearInfo.items, ...itemsBatch];

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
                        items
                    }
                }
            }

        case 'error':
            return { 
                ...state, 
                loading: false, 
                errorMsg: action.message 
            };

        default:
            return state;
    }
}

export type FetcherState<I> = {
    errorMsg: string,
    loading: boolean,
    selectedYear: string,
    years: {
        [key: string]: YearContent<I>
    },
}

export type FetcherAction<I> = { type: 'fetchStart' } |
{ type: 'addItems', yearContent: YearContent<I>} |
{ type: 'error', message: string } |
{ type: 'selectYear', yearMeta: YearMeta};
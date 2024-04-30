import { fetchData } from "@/utils/clientHelpers";
import { MouseEventHandler, useEffect, useReducer } from "react";

export default function useBatchFetcher<T extends YearItem>({
    batchSize, yearMeta, url
}: {batchSize: number, yearMeta: YearMeta, url: string}) {
    const [state, dispatch] = useReducer(reducer<T>, { batchSize, yearMeta }, initReducer<T>);

    const { hasMore, items } = state.years[state.selectedYear];

    const handleFetchMore: MouseEventHandler<HTMLButtonElement> = async (e) => {
        dispatch({type: 'fetchStart'});

        const { lastDate, lastId, year } = state.years[state.selectedYear];

        const params = new URLSearchParams({lastDate, lastId, year: state.selectedYear});

        const res = await fetchData<T[]>(`/api${url}?${params.toString()}`);

        if (res.failed)
            dispatch({type: 'error', message: res.data})

        else
            dispatch({type: 'success', items: res.data, year});
    };

    useEffect(() => {
        dispatch({type: 'setYear', yearMeta})
    }, [yearMeta]);

    return {hasMore, items, handleFetchMore, loading: state.loading};
}

export function initReducer<T extends YearItem>({batchSize, yearMeta}: {
    batchSize: number, yearMeta: YearMeta}) : FetcherState<T> {

    
    const selectedYear = getYearStateKey(yearMeta.year);
    
    const years = { 
        [selectedYear] : makeFullYearInfo<T>(yearMeta)
    };

    return {
        batchSize,
        loading: false,
        errorMsg: '',
        selectedYear,
        years
    }
}

export function reducer<T extends YearItem>(state: FetcherState<T>, action: FetcherAction<T>) {
    switch (action.type) {
        case 'setYear':

            const yearKey = getYearStateKey(action.yearMeta.year);
            const updState = {
                ...state,
                errorMsg: '',
                selectedYear: yearKey,
            }

            if (yearKey in state.years)
                return updState;

            else {
                updState.years = {...state.years, [yearKey]: makeFullYearInfo<T>(action.yearMeta)};
                return updState;
            }

        case 'fetchStart':
            return { ...state, loading: true, errorMsg: '' };

        case 'success':

            const curYear = getYearStateKey(action.year);
            const latestItem : T | undefined = action.items[action.items.length - 1];

            if (latestItem)
            
                return {
                    ...state,
                    loading: false,
                    years: {...state.years, [curYear]: {
                        items: [...state.years[curYear].items, ...action.items],
                        hasMore: action.items.length === state.batchSize,
                        lastId: latestItem._id,
                        lastDate: latestItem.date
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

function makeFullYearInfo<T extends YearItem>(info: YearMeta): YearContent<T> {
    return {...info, items: []};
}

export type YearItem = {_id: string, date: string};

export type YearMeta = { 
    year?: string,
    hasMore: boolean,
    lastDate: string,
    lastId: string,
};

type YearContent<T extends YearItem> = YearMeta & {items: T[]};

type FetcherState<T extends YearItem> = {
    batchSize: number,
    errorMsg: string,
    loading: boolean,
    selectedYear: string,
    years: {
        [key: string]: YearContent<T>
    },
}

type FetcherAction<T extends YearItem> = { type: 'fetchStart' } | 
    { type: 'success', items: T[], year?: string } | 
    { type: 'error', message: string } | 
    { type: 'setYear', yearMeta: YearMeta};
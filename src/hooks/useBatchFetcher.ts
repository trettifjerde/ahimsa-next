'use client';

import { MouseEventHandler, useReducer } from "react";
import { fetchData } from "@/utils/clientHelpers";
import { FetcherEntry, FetcherEntryMeta} from "@/utils/types";

export default function useBatchFetcher<I>(url: string, keyName: string) {

    const [state, dispatch] = useReducer(reducer<I>, null, initBatchFetcherReducer<I>);

    const selectKey = (info: FetcherEntryMeta) => {
        dispatch({type: 'selectKey', entriesMeta: info});
    };

    const handleFetchMore: MouseEventHandler<HTMLButtonElement> = async (e) => {
        dispatch({ type: 'fetchStart' });
        
        const selKey = state.selectedKey;
        const { lastDate } = state.entries[selKey];

        const params = new URLSearchParams({ lastDate });

        if (selKey !== 'all') 
            params.set(keyName, selKey);

        const res = await fetchData<FetcherEntry<I>>(`/api${url}?${params.toString()}`);

        if (res.failed)
            dispatch({ type: 'error', message: res.data })

        else 
            dispatch({ 
                type: 'addItems', 
                entries: res.data, 
                key: selKey
            });
    };

    return { state, selectKey, handleFetchMore };
}

export function initBatchFetcherReducer<I>(): FetcherState<I> {

    return {
        loading: false,
        errorMsg: '',
        selectedKey: '',
        entries: {}
    }
}

export function reducer<I>(state: FetcherState<I>, action: FetcherAction<I>) {
    switch (action.type) {
        case 'selectKey':
            const meta = action.entriesMeta;

            return {
                ...state,
                loading: false,
                errorMsg: '',
                selectedKey: meta.key,
                entries: (meta.key in state.entries) ? state.entries : {
                    ...state.entries,
                    [meta.key] : {
                        ...meta,
                        items: []
                    }
                }
            }

        case 'fetchStart':
            return { ...state, loading: true, errorMsg: '' };

        case 'addItems':
            const {entries, key} = action;
            const {items: itemsBatch, lastDate} = entries;
            const curYearInfo = state.entries[key];

            const items = itemsBatch.length === 0 ? curYearInfo.items : [...curYearInfo.items, ...itemsBatch];

            return {
                ...state,
                loading: false,
                errorMsg: '',
                entries: {
                    ...state.entries,
                    [key] : {
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
    selectedKey: string,
    entries: {
        [key: string]: FetcherEntry<I>
    },
}

export type FetcherAction<I> = { type: 'fetchStart' } |
{ type: 'addItems', entries: FetcherEntry<I>, key: string} |
{ type: 'error', message: string } |
{ type: 'selectKey', entriesMeta: FetcherEntryMeta};
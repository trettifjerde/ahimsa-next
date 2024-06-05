'use client';

import { useContext, useEffect } from "react";
import { FetcherEntryMeta } from "@/utils/types";
import { ListContext } from "@/components/ui/list/list-context-provider";
import { FetcherState } from "./useBatchFetcher";

export type ListContextState<T> = ReturnType<typeof extractInfoFromState<T>>;

export default function useFetcherContextConsumer<T>(context: ListContext<T>, initInfo: FetcherEntryMeta) {
    const { state: fetcherState, selectKey, handleFetchMore } = useContext(context);
    const state = extractInfoFromState(fetcherState, initInfo);

    useEffect(() => {
        selectKey(initInfo);
    }, [initInfo]);

    return { state, handleFetchMore};
}

function extractInfoFromState<I>(state: FetcherState<I>, initInfo: FetcherEntryMeta) {
    const {loading, errorMsg, selectedKey} = state;
    const {items, hasMore} = selectedKey ? state.entries[selectedKey] : {items: [], hasMore: null};

    return { 
        loading, 
        errorMsg, 
        items, 
        hasMore: hasMore !== null ? hasMore : initInfo.hasMore 
    };
}
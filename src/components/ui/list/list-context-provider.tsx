'use client';

import useBatchFetcher, { FetcherState, initBatchFetcherReducer } from "@/hooks/useBatchFetcher";
import { FetcherEntryMeta } from "@/utils/types";
import { MouseEventHandler, ReactNode, createContext } from "react";

export function createListContext<T>() {
    return createContext<{
        state: FetcherState<T>,
        selectKey: (info: FetcherEntryMeta) => void,
        handleFetchMore: MouseEventHandler
    }>({
        state: initBatchFetcherReducer(),
        selectKey: () => {},
        handleFetchMore: () => { }
    });    
};

type ListContext<T> = ReturnType<typeof createListContext<T>>;

export default function ListContextProvider<I>({Cont, children, url, keyName }: { 
    Cont: ListContext<I>,
    children: ReactNode,
    url: string,
    keyName: string 
}) {
    const { state, selectKey, handleFetchMore } = useBatchFetcher<I>(url, keyName);

    return <Cont.Provider value={{ state, selectKey, handleFetchMore }}>
        {children}
    </Cont.Provider>
}
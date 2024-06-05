'use client';

import { MouseEventHandler, ReactNode, createContext } from "react";
import { FetcherEntryMeta } from "@/utils/types";
import useBatchFetcher, { FetcherState, initBatchFetcherReducer } from "@/hooks/useBatchFetcher";

export type ListContext<T> = ReturnType<typeof createListContext<T>>;

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


export default function ListContextProvider<I>({Cont, children, url, keyName }: { 
    Cont: ListContext<I>,
    children: ReactNode,
    url: string,
    keyName: string 
}) {
    const { state, selectKey, handleFetchMore } = useBatchFetcher<I>(url, keyName);

    return <Cont.Provider value={{ 
        state, 
        selectKey, 
        handleFetchMore 
    }}>
        {children}
    </Cont.Provider>
}
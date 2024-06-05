'use client';

import { FetcherEntryMeta } from "@/utils/types";
import { StoriesContext } from "./stories-context";
import useFetcherContextConsumer from "@/hooks/useContextConsumer";
import StoryItem from "./story-item";
import FetchButton from "../ui/list/fetch-button/fetch-button";

export default function StoriesFetcher({initInfo}: {initInfo: FetcherEntryMeta}) {

    const {state, handleFetchMore } = useFetcherContextConsumer(StoriesContext, initInfo);

    return <>
        {state.items.map(item => <StoryItem key={item.slug} story={item} />)}

        {state.hasMore && <FetchButton loading={state.loading} fetchMore={handleFetchMore} />}
    </>
}
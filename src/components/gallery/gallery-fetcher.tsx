'use client'

import { SpinnerButton } from "../ui/buttons";
import useBatchFetcher, { YearMeta } from "@/hooks/useBatchFetcher";
import GalleryEntry from "./gallery-entry";
import { GalleryEvent } from "@/sanity/lib/types";
import styles from './fetcher.module.css';

export default function GalleryFetcher({batchSize, yearMeta}: {batchSize: number, yearMeta: YearMeta}) {

    const {loading, hasMore, items, handleFetchMore} = useBatchFetcher<GalleryEvent>({batchSize, yearMeta, url: "/gallery"});

    return <>
        {items.map(item => <GalleryEntry key={item._id} type={item._type} slug={item.slug} title={item.title} gallery={item.gallery} />)}
        {hasMore && <div className={styles.spb}><SpinnerButton loading={loading} onClick={handleFetchMore}>Load more</SpinnerButton></div>}
    </>
}
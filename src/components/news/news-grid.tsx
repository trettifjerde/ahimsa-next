import { Suspense } from "react";
import styles from './news-grid.module.css';
import { getYearPageGroqParams } from "@/utils/serverHelpers";
import { NEWS_BATCH_SIZE } from "@/utils/env-fallback";
import NewsGridInner from "./news-grid-inner";
import NewsItemPreview from "./news-prev";

export default function NewsGrid({year, withFetcher = false}: {year?: number, withFetcher?: boolean}) {

    const fetchParams = getYearPageGroqParams(NEWS_BATCH_SIZE, year);

    return <div className={styles.g}>
        <Suspense fallback={<NewsSkeletonFallback />}>
            <NewsGridInner fetchParams={fetchParams} withFetcher={withFetcher} />
        </Suspense>
    </div>
}

function NewsSkeletonFallback() {
    const ns : number[] = [];
    for (let i = 0; i < NEWS_BATCH_SIZE; i++)
        ns.push(i);

    return <>{ns.map(n => <NewsItemPreview key={n} />)}</>
}
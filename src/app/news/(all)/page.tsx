import { redirect } from "next/navigation";
import { getYearNews } from "@/sanity/lib/fetches";
import { NewsListPreviewItem } from "@/sanity/lib/types";
import { NEWS_BATCH_SIZE, getListQueryParams } from "@/utils/serverHelpers";
import NewsItemPreview from "@/components/news/news-prev";
import NewsFetcher from "@/components/news/news-fetcher";
import styles from './p.module.css';
import { NewsSkeletonItem } from "@/components/news/news-skeleton";

export default async function News({ searchParams }: { searchParams?: { year?: string } }) {
    const year = searchParams?.year;
    const fetchParams = getListQueryParams({ year });

    // url params provided and invalid
    if (!fetchParams)
        redirect('/news');

    const news = await getYearNews(fetchParams);

    if (!news)
        throw new Error('Failed to fetch news');

    const lastNews: NewsListPreviewItem | undefined = news[news.length - 1];

    return <>
        {news.map(item => <NewsItemPreview key={item.slug} item={item} />)}

        {!lastNews && <div className={styles.emp}>No news this year</div>}

        <NewsFetcher 
            initInfo={{
                batchSize: NEWS_BATCH_SIZE,
                hasMore: news.length == NEWS_BATCH_SIZE,
                lastDate: lastNews?.date || '',
                year
            }} />
    </>
}
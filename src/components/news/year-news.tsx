import { getYearNews } from "@/sanity/lib/fetches";
import { NewsListPreviewItem } from "@/sanity/lib/types";
import { NEWS_BATCH_SIZE } from "@/utils/serverHelpers";
import { YearListQueryParams } from "@/utils/types";
import NewsItemPreview from "./news-prev";
import NewsFetcher from "./news-fetcher";
import styles from './year-news.module.css';

export default async function YearNews({fetchParams}: {
    fetchParams?: YearListQueryParams
}) {

    const news = await getYearNews(fetchParams);

    if (!news)
        throw new Error('Failed to fetch news');

    const lastNews: NewsListPreviewItem | undefined = news[news.length - 1];

    return <>
        {news.map(item => <NewsItemPreview key={item.slug} item={item} />)}

        {!lastNews && <div className={styles.emp}>No news this year</div>}

        <NewsFetcher 
            initInfo={{
                hasMore: news.length === NEWS_BATCH_SIZE,
                lastDate: lastNews?.date || '',
                year: fetchParams?.year || null
            }} />
    </>
}
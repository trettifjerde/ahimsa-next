import { getYearNews } from "@/sanity/lib/fetches";
import { NEWS_BATCH_SIZE, getYearPageGroqParams, makeFetcherInitInfo } from "@/utils/serverHelpers";
import NewsItemPreview from "./news-prev";
import NewsFetcher from "./news-fetcher";
import styles from './year-news.module.css';

export default async function YearNews({year}: {
    year?: number
}) {

    const fetchParams = getYearPageGroqParams(NEWS_BATCH_SIZE, year);
    const news = await getYearNews(fetchParams);

    if (!news)
        throw new Error('Failed to fetch news');

    return <>
        {news.map(item => <NewsItemPreview key={item.slug} item={item} />)}

        {news.length === 0 && <div className={styles.emp}>No news this year</div>}

        <NewsFetcher initInfo={makeFetcherInitInfo(news, NEWS_BATCH_SIZE, fetchParams?.start)} />
    </>
}
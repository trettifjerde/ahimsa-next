import { getYearNews } from "@/sanity/lib/fetches";
import { NEWS_BATCH_SIZE, getYearPageGroqParams, makeFetcherInitInfo } from "@/utils/serverHelpers";
import NewsItemPreview from "./news-prev";
import NewsFetcher from "./news-fetcher";
import styles from './year-news.module.css';
import NewsGrid from "./news-grid";

export default async function YearNews({ year }: {
    year?: number
}) {

    const fetchParams = getYearPageGroqParams(NEWS_BATCH_SIZE, year);
    const news = await getYearNews(fetchParams);

    if (!news)
        throw new Error('Failed to fetch news');

    return <>
        <h1>Novosti</h1>
        
        <NewsGrid>
            {news.map(item => <NewsItemPreview key={item.slug} item={item} />)}
            <NewsFetcher initInfo={makeFetcherInitInfo(news, NEWS_BATCH_SIZE, fetchParams?.start)} />
        </NewsGrid>

        {news.length === 0 && <div className={styles.emp}>No news this year</div>}

    </>
}
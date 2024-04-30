import { redirect } from "next/navigation";
import { getYearNews } from "@/sanity/lib/fetches";
import { NEWS_BATCH_SIZE, getNewsListQueryParams } from "@/utils/serverHelpers";
import { NewsListQueryResult } from "../../../../sanity.types";
import NewsItemPreview from "@/components/news/news-prev";
import styles from './p.module.css';
import NewsGrid from "@/components/news/news-grid";

export default async function News({ searchParams }: { searchParams?: { year?: string } }) {
    const year = searchParams?.year;
    const fetchParams = getNewsListQueryParams({ year });

    // url params provided and invalid
    if (!fetchParams)
        redirect('/news');

    const news = await getYearNews(fetchParams);

    if (!news)
        throw new Error('Failed to fetch news');

    const lastNews : NewsListQueryResult['0'] | undefined = news[news.length - 1];

    return <NewsGrid 
            url="/news"
            batchSize={NEWS_BATCH_SIZE} 
            yearMeta={{
                hasMore: news.length == NEWS_BATCH_SIZE,
                lastDate: lastNews?.date || '',
                lastId: lastNews?._id || '',
                year
            }}
            >
                {news.map(item => <NewsItemPreview key={item._id} item={item} />)}

                {!lastNews && <div className={styles.emp}>No news this year</div>}
        </NewsGrid>
}
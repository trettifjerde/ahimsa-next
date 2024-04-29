import { redirect } from "next/navigation";
import { getYearNews } from "@/sanity/lib/fetches";
import NewsItemPreview from "@/components/news/news-prev";
import NewsGrid from "@/components/news/news-grid";
import { NEWS_BATCH_SIZE, getNewsListQueryParams } from "@/utils/serverHelpers";
import { NewsListQueryResult } from "../../../../sanity.types";

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
        batchSize={NEWS_BATCH_SIZE} 
        year={year}
        yearInfo={{
            hasMore: news.length == NEWS_BATCH_SIZE,
            lastDate: lastNews?.date || '',
            lastId: lastNews?._id || ''
        }}
        >
            {news.map(item => <NewsItemPreview key={item.slug} news={item} />)}

            {!lastNews && <div>No news this year</div>}
    </NewsGrid>
}
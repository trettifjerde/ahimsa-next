import { redirect } from "next/navigation";
import { getYearNews } from "@/sanity/lib/fetches";
import NewsItemPreview from "@/components/news/news-prev";
import NewsGrid from "@/components/news/news-grid";
import { NEWS_BATCH_SIZE, getNewsListQueryParams } from "@/utils/serverHelpers";

export default async function News({ searchParams }: { searchParams?: { year?: string } }) {
    const year = searchParams?.year;
    const fetchParams = getNewsListQueryParams({ year });

    console.log('News Page search params');

    // url params provided and invalid
    if (!fetchParams)
        redirect('/news');

    const news = await getYearNews(fetchParams);

    if (!news)
        throw new Error('Failed to fetch news');

    const lastNews = news.length === 0 ? null : news[news.length - 1];

    return <div>
            {lastNews && <NewsGrid 
                batchSize={NEWS_BATCH_SIZE} 
                hasMore={news.length <= NEWS_BATCH_SIZE}
                lastDate={lastNews.date}
                lastId={lastNews._id}
                year={year}
                >

                {news.map(item => <NewsItemPreview key={item.slug} news={item} />)}

            </NewsGrid>}

            {!lastNews && <div>No news this year</div>}
        </div>
}
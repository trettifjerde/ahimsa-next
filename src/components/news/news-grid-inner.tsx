import { getYearNews } from "@/sanity/lib/fetches";
import { NEWS_BATCH_SIZE } from "@/utils/env-fallback";
import { makeFetcherInitInfo } from "@/utils/serverHelpers";
import { GroqYearParams } from "@/utils/types";
import NewsItemPreview from "./news-prev";
import NewsFetcher from "./news-fetcher";

export default async function NewsGridInner({fetchParams, withFetcher}: {
    fetchParams: GroqYearParams, 
    withFetcher: boolean
}) {
    const news = await getYearNews(fetchParams);
    const fetcherInitInfo = withFetcher ? makeFetcherInitInfo(news, NEWS_BATCH_SIZE, fetchParams.start) : null;

    return <>
        {news.map(item => <NewsItemPreview key={item.slug} item={item} />)}
        {news.length === 0 && <div style={{
            flexGrow: 1,
            textAlign: 'center',
            paddingBlock: '15%'
            }}>Nema novosti</div>}
        {fetcherInitInfo && <NewsFetcher initInfo={fetcherInitInfo} />}
    </>
}
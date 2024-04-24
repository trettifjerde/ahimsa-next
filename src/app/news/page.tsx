import { redirect } from "next/navigation";
import { getYearNews } from "@/sanity/lib/fetches";
import Main from "@/components/layout/main";
import NewsItemPreview from "@/components/news/news-item-preview";


export default async function News({searchParams}: {searchParams?: {year?: string}}) {
    const year = searchParams?.year;
    const fetchParams = getFetchParams({year});

    if (!fetchParams)
        redirect('/news');

    const news = await getYearNews(fetchParams);

    if (!news)
        throw new Error('Failed to fetch news');

    return <Main>
        <h1>News</h1>
        {news.map(item => <NewsItemPreview key={item.slug} news={item} />)}
        {news.length === 0 && <div>No news this year</div>}
    </Main>
}

function getFetchParams({year, lastId=''}: {year?: string, lastId?: string}) {
    const batchSize = parseInt(process.env.NEWS_BATCH_SIZE || '10');

    if (!year) {
        return {lastDate: new Date().toISOString(), limit: '', lastId, batchSize};
    }

    if (year.length === 4) {
        const n = parseInt(year);
        if (n > 2015 && n <= new Date().getFullYear())
            return {lastDate: new Date(n, 11, 31).toISOString(), limit: `${n}-01-01`, lastId, batchSize};
    } 
    return null;
}
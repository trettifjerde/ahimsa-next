import Main from "@/components/layout/main";
import NewsItemPreview from "@/components/news/news-item-preview";

import { client } from "@/sanity/lib/client";
import { newsListQuery } from "@/sanity/lib/queries";
import { NewsListQueryResult } from "../../../sanity.types";

export default async function News() {
    const news = await client.fetch<NewsListQueryResult>(newsListQuery);

    if (!news)
        throw new Error('Failed to fetch news');

    return <Main>
        <h1>News</h1>
        {news.map(item => <NewsItemPreview key={item.slug} news={item} />)}
    </Main>
}
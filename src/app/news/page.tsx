import Main from "@/components/layout/main";
import NewsItemPreview from "@/components/news/news-item-preview";

import { client } from "@/sanity/lib/client";
import { NEWSLIST_QUERY, NewsListQuery } from "@/sanity/lib/queries";

export default async function News() {
    const news = await client.fetch<NewsListQuery[]>(NEWSLIST_QUERY);
    return <Main>
        <h1>News</h1>
        {news.map(item => <NewsItemPreview key={item.slug} news={item} />)}
    </Main>
}
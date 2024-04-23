import { NewsListQuery } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

export default function NewsItemPreview({news}: {news: NewsListQuery}) {
    const date = new Date(news.date).toLocaleDateString('hr');

    return <Link href={`/news/${news.slug}`}>
        <article>
            <h2>{news.title}</h2>
            <div>{date}</div>
            <PortableText value={news.description}/>
        </article>
    </Link>
}
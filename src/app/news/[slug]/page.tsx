import Main from "@/components/layout/main";
import { client } from "@/sanity/lib/client";
import { newsArticleQuery } from "@/sanity/lib/queries";
import { NewsArticleQueryResult } from "../../../../sanity.types";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import logo from "@/../public/logo.svg";
import styles from './a.module.css';

export default async function NewsItem({params}: {params: {slug: string}}) {

    const news = await client.fetch<NewsArticleQueryResult>(newsArticleQuery, {slug: params.slug});

    if (!news)
        notFound();

    console.log(news.image);
    return <Main>
        <h1>{news.title}</h1>
        <div>{news.date}</div>
        <div className={styles.ic}>
            <Image src={news.image || logo} alt="Dekorativna slika" fill/>
        </div>
        <PortableText value={news.description} />
    </Main>
}
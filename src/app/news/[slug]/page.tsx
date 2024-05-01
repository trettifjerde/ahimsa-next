import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { newsArticleQuery } from "@/sanity/lib/queries";
import { NewsArticleQueryResult } from "../../../../sanity.types";
import { PortableText } from "@portabletext/react";
import { getImageUrl } from "@/utils/image-helpers";
import styles from './a.module.css';

export default async function NewsItem({params}: {params: {slug: string}}) {

    const news = await client.fetch<NewsArticleQueryResult>(newsArticleQuery, {slug: params.slug});
    
    if (!news)
        notFound();

    console.log(news.gallery);
    const date = new Date(news.date).toLocaleDateString('hr', {month: 'long', year: 'numeric', day: 'numeric', weekday: 'long'});
    const image = getImageUrl(news.image);
    const gallery = news.gallery;

    return <article>
        <h1 className={styles.h}>{news.title}</h1>
        <div className={styles.date}>{date}</div>
        <div className={styles.ic}>
            <Image src={image} alt="Dekorativna slika" fill/>
        </div>
        <PortableText value={news.description} />
        {gallery && <div>
            {gallery.map(img => <div>
                <Image src={getImageUrl(img)} alt="" width={150} height={150} />
            </div>)}
        </div>}
    </article>
}
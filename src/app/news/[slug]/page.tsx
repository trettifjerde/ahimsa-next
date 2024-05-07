import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { newsArticleQuery } from "@/sanity/lib/queries";
import { NewsArticleQueryResult } from "../../../../sanity.types";
import { PortableText } from "@portabletext/react";
import { getImageUrl } from "@/utils/image-helpers";
import styles from './a.module.css';
import GalleryGrid from "@/components/gallery/gallery-grid";
import GalleryPic from "@/components/gallery/gallery-pic";
import GalleryViewer from "@/components/gallery/gallery-viewer";
import { makePics } from "@/utils/serverHelpers";

export default async function NewsItem({params}: {params: {slug: string}}) {

    const news = await client.fetch<NewsArticleQueryResult>(newsArticleQuery, {slug: params.slug});
    
    if (!news)
        notFound();

    const date = new Date(news.date).toLocaleDateString('hr', {month: 'long', year: 'numeric', day: 'numeric', weekday: 'long'});

    return <article>
        <h1 className={styles.h}>{news.title}</h1>
        
        <div className={styles.date}>{date}</div>

        <div className={styles.ic}>
            <Image src={getImageUrl(news.image)} alt="Dekorativna slika" fill/>
        </div>
        <PortableText value={news.description} />

        {news.gallery && <GalleryGrid className={styles.gg}>
            <GalleryViewer pics={makePics(news.gallery)} />
        </GalleryGrid>}
    </article>
}
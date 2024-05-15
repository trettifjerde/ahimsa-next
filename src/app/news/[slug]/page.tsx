import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getArtcile } from "@/sanity/lib/fetches";
import { getImageUrl } from "@/utils/image-helpers";
import { makePics } from "@/utils/serverHelpers";
import NewsBack from "@/components/news/news-back";
import GalleryGrid from "@/components/gallery/gallery-grid";
import GalleryViewer from "@/components/gallery/gallery-viewer";
import styles from './a.module.css';

export default async function NewsItem({ params }: { params: { slug: string } }) {

    const news = await getArtcile(params.slug);

    if (!news)
        notFound();

    const date = new Date(news.date).toLocaleString('hr', { dateStyle: 'full', timeStyle: 'short' });

    return <>
        <div className={styles.back}>
        <NewsBack />
        </div>
        <article>
            <h1 className={styles.h}>{news.title}</h1>

            <div className={styles.date}>{date}</div>

            <div className={styles.ic}>
                <Image src={getImageUrl(news.image)} alt="Dekorativna slika" fill />
            </div>
            <PortableText value={news.description} />

            {news.gallery && <GalleryGrid className={styles.gg}>
                <GalleryViewer pics={makePics(news.gallery)} />
            </GalleryGrid>}
        </article>
    </>
}
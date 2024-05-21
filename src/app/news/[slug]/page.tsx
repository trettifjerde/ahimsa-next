import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getArtcile } from "@/sanity/lib/fetches";
import { getFullImageUrl, getImageUrl } from "@/utils/image-helpers";
import { makePics } from "@/utils/serverHelpers";
import NewsBack from "@/components/news/news-back";
import GalleryGrid from "@/components/gallery/gallery-grid";
import GalleryViewer from "@/components/gallery/gallery-viewer";
import MainBlock from "@/components/layout/main-bl";
import styles from './a.module.css';
import leafStyles from '@/styles/leaf.module.css';

type Props = { params: { slug: string } };

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const news = await getArtcile(params.slug);

    if (news)

        return {
            title: news.title,
            description: news.excerpt,
            openGraph: {
                images: [getImageUrl(news.image)],
            },
        }

    else {
        return {};
    }
}

export default async function NewsItem({ params }: Props) {

    const news = await getArtcile(params.slug);

    if (!news)
        notFound();

    const date = new Date(news.date).toLocaleString('hr', { dateStyle: 'full', timeStyle: 'short' });

    return <MainBlock>
        <div className={styles.back}>
            <NewsBack />
        </div>
        <article>
            <h1 className={styles.h}>{news.title}</h1>

            <div className={styles.date}>{date}</div>

            <div className={styles.ic} style={{ aspectRatio: news.image?.aspectRatio || '1/1' }}>
                <Image src={getFullImageUrl(news.image)} alt="Dekorativna slika" fill />
            </div>

            <div className={`${leafStyles.lf} ${styles.t}`}>
                <PortableText value={news.description} />
            </div>

            {news.gallery && <GalleryGrid className={styles.gg}>
                <GalleryViewer pics={makePics(news.gallery)} />
            </GalleryGrid>}
        </article>
    </MainBlock>
}
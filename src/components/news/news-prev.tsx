import Link from "next/link";
import styles from './news-prev.module.css';
import { NewsListQueryResult } from "../../../sanity.types";
import Image from "next/image";
import logo from '@/../public/logo.svg';
import { urlForImage } from "@/sanity/lib/image";
import { getImageUrl } from "@/utils/image-helpers";

type Info = Exclude<NewsListQueryResult, null>[0];

export default function NewsItemPreview({ news }: { news: Info }) {

    const image = getImageUrl(news.image);

    return <Link className={styles.a} href={`/news/${news.slug}`}>
        <article className={styles.art}>
            <div className={styles.h}>
                <h2>{news.title}</h2>
                <div className={styles.d}>{new Date(news.date).toLocaleDateString('hr')}</div>
            </div>
            <div className={styles.ic}>
                <Image src={image} alt="Dekorativna slika" fill />
            </div>
            <div className={styles.desc}>
                {news.excerpt}
            </div>
        </article>
    </Link>
}
import Link from "next/link";
import styles from './news-prev.module.css';
import Image from "next/image";
import { getImageUrl } from "@/utils/image-helpers";
import { NewsListPreviewItem } from "@/sanity/lib/types";

export default function NewsItemPreview({ item }: { item: NewsListPreviewItem }) {

    const image = getImageUrl(item.image);
    const date = new Date(item.date).toLocaleString('hr', {dateStyle: 'short', timeStyle: 'short'});

    return <Link className={styles.a} href={`/news/${item.slug}`}>
        <article className={styles.art}>
            <div className={styles.h}>
                <h4>{item.title}</h4>
                <div className={styles.d}>{date}</div>
            </div>
            <div className={styles.ic}>
                <Image src={image} alt="Dekorativna slika" fill />
            </div>
            <div className={styles.desc}>
                {item.excerpt}
            </div>
        </article>
    </Link>
}
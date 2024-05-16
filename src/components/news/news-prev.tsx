import Link from "next/link";
import Image from "next/image";
import { NewsListPreviewItem } from "@/sanity/lib/types";
import { getImageUrl } from "@/utils/image-helpers";
import styles from './news-prev.module.css';
import leafStyles from '@/styles/leaf.module.css';

export default function NewsItemPreview({ item }: { item: NewsListPreviewItem }) {

    const image = getImageUrl(item.image);
    const date = new Date(item.date).toLocaleString('hr', { dateStyle: 'short', timeStyle: 'short' });

    return <Link className={`${leafStyles.lf} ${styles.a}`} href={`/news/${item.slug}`}>
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
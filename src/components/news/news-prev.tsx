import Link from "next/link";
import styles from './news-prev.module.css';
import { NewsListQueryResult } from "../../../sanity.types";
import Image from "next/image";
import { getImageUrl } from "@/utils/image-helpers";

type Info = Exclude<NewsListQueryResult, null>[0];

export default function NewsItemPreview({ item }: { item: Info }) {

    const image = getImageUrl(item.image);

    return <Link className={styles.a} href={`/news/${item.slug}`}>
        <article className={styles.art}>
            <div className={styles.h}>
                <h2>{item.title}</h2>
                <div className={styles.d}>{new Date(item.date).toLocaleDateString('hr')}</div>
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
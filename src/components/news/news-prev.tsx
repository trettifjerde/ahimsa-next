import Link from "next/link";
import { NewsListPreviewItem } from "@/sanity/lib/types";
import CustomImage from "../ui/image/customImage";
import styles from './news-prev.module.css';
import leafStyles from '@/styles/leaf.module.css';
import listItemStyles from '@/styles/list-item.module.css';

const sizes = '(max-width: 20rem) 90vw, (max-width: 40rem) 16rem, (max-width: 64rem) 20rem, 16rem';

export default function NewsItemPreview({ item }: { item: NewsListPreviewItem }) {

    const date = new Date(item.date).toLocaleString('hr', { dateStyle: 'short', timeStyle: 'short' });

    return <Link className={`${leafStyles.lf} ${listItemStyles.c} ${styles.c}`} href={`/news/article/${item.slug}`}>
        <article className={`${listItemStyles.ci} ${styles.ci}`}>
            <div className={styles.h}>
                <div className={listItemStyles.d}>{date}</div>
                <h4>{item.title}</h4>
            </div>
            <div className={`${listItemStyles.ic} ${styles.ic}`}>
                <CustomImage source={item.image} square sizes={sizes} />
            </div>
            <div className={`${listItemStyles.desc} ${styles.desc}`}>
                <p>
                    {item.excerpt}
                </p>
            </div>
        </article>
    </Link>
}
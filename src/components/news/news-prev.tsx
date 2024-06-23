import Link from "next/link";
import { NewsListPreviewItem } from "@/sanity/lib/types";
import CustomImage from "../ui/image/customImage";
import styles from './news-prev.module.css';
import leafStyles from '@/styles/leaf.module.css';
import listItemStyles from '@/styles/list-item.module.css';
import { ReactNode } from "react";

const sizes = '(max-width: 20rem) 90vw, (max-width: 40rem) 16rem, (max-width: 64rem) 20rem, 16rem';
const wrapperClasses = `${leafStyles.lf} ${listItemStyles.c} ${styles.c} ${listItemStyles.clf}`;

export default function NewsItemPreview({ item }: { item?: NewsListPreviewItem }) {

    const date = item ? new Date(item.date).toLocaleString('hr', { dateStyle: 'short', timeStyle: 'short' }) : '';

    return <NewsItemWrapper item={item}>
        <article className={`${listItemStyles.ci} ${styles.ci}`}>
            <div className={styles.h}>
                <div className={listItemStyles.d}>{date}</div>
                <h4>{item?.title || ''}</h4>
            </div>
            <div className={`${listItemStyles.ic} ${styles.ic}`}>
                <CustomImage source={item?.image} square sizes={sizes} />
            </div>
            <div className={`${listItemStyles.desc} ${styles.desc}`}>
                {item && <p>
                    {item.excerpt}
                </p>}
            </div>
            {!item && <div className="shmr"></div>}
        </article>
    </NewsItemWrapper>
}

function NewsItemWrapper({item, children}: {item?: NewsListPreviewItem, children: ReactNode}) {
    if (item)
        return <Link className={wrapperClasses} href={`/news/article/${item.slug}`}>
            {children}
            </Link>

    return <div className={wrapperClasses}>{children}</div>
}
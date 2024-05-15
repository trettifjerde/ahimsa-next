import Link from 'next/link';
import styles from './ribbon.module.css';

export default function GalleryRibbon({ slug, title, className }: { slug?: string, title?: string, className?: string }) {
    const clName = `${styles.ribbon} ${className ? className : ''}`;

    return <>
        {slug && title && <Link className={clName} href={slug}>
            <div><span>From: </span><h5>{title}</h5></div>
        </Link>}
        {!slug && title && <div className={clName}>
            <div>{title}</div>
        </div>}
    </>
}
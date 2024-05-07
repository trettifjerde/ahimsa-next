
import Image from 'next/image';
import styles from './news-prev.module.css';
import shimmer from '@/styles/shimmer.module.css';
import { getImageUrl } from '@/utils/image-helpers';

export function NewsSkeletonItem() {
    return <div className={styles.a}>
        <article className={styles.art}>
            <div className={styles.h}>
                <h4></h4>
                <div className={styles.d}></div>
            </div>
            <div className={styles.ic}>
                <Image src={getImageUrl(null)} alt="Dekorativna slika" fill />
            </div>
            <div className={styles.desc}></div>
            <div className={shimmer.l}></div>
        </article>
    </div>
}
import styles from './news-prev.module.css';
import leafStyles from '@/styles/leaf.module.css';
import shimmer from '@/styles/shimmer.module.css';
import { getLogoUrl } from '@/utils/image-helpers';

export function NewsSkeletonItem() {
    return <div className={`${leafStyles.lf} ${styles.a}`}>
        <article className={styles.art}>
            <div className={styles.h}>
                <div className={styles.d}></div>
                <h4></h4>
            </div>
            <div className={styles.ic}>
                <img src={getLogoUrl()}/>
            </div>
            <div className={styles.desc}></div>
            <div className={shimmer.l}></div>
        </article>
    </div>
}
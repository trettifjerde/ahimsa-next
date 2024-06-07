import { getLogoUrl } from '@/utils/image-helpers';
import styles from './gallery-pic.module.css';
import shimmer from '@/styles/shimmer.module.css';

export default function GallerySkeletonPic() {

    return <div className={styles.c}>
        <img src={getLogoUrl()}/>
        <div className={shimmer.l}></div>
    </div>
}
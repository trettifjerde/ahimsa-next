import Image from "next/image";
import { getImageUrl } from "@/utils/image-helpers";
import styles from './gallery-pic.module.css';
import shimmer from '@/styles/shimmer.module.css';

export default function GallerySkeletonPic() {

    return <div className={styles.c}>
        <Image src={getImageUrl(null)} alt="" fill/>
        <div className={shimmer.l}></div>
    </div>
}
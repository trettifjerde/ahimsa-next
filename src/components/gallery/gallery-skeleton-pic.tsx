import styles from './gallery-pic.module.css';
import GalleryRibbon from "./gallery-ribbon";
import CustomImage from "../ui/image/customImage";

const sizes = '(max-width: 40rem) 10rem, (max-width: 64rem) 14rem, 17rem';

export default function GallerySkeletonPic() {

    return <div className={styles.c}>
        <CustomImage source={null} square sizes={sizes} />
        <GalleryRibbon className={styles.ribbon}/>
        <div className='shmr' />
    </div>
}
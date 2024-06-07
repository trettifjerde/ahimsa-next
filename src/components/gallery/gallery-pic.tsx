import { GalleryEntryPic } from "@/sanity/lib/types";
import styles from './gallery-pic.module.css';
import GalleryRibbon from "./gallery-ribbon";
import CustomImage from "../ui/image/customImage";

const sizes = '(max-width: 40rem) 10rem, (max-width: 64rem) 14rem, 17rem';

export default function GalleryPic({pic, select}: {
    pic: GalleryEntryPic, select: () => void}) {

    return <div className={styles.c}>
        <CustomImage source={pic.image} square sizes={sizes} onClick={select}/>
        <GalleryRibbon slug={pic.slug} title={pic.title} className={styles.ribbon}/>
    </div>
}
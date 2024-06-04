import Image from "next/image";
import { GalleryEventPic, GalleryImage } from "@/sanity/lib/types";
import { getImageUrl } from "@/utils/image-helpers";
import styles from './gallery-pic.module.css';
import GalleryRibbon from "./gallery-ribbon";

const sizes = '(max-width: 40rem) 11rem, (max-width: 64rem) 15rem, 17rem';

export default function GalleryPic({pic, select}: {
    pic: GalleryEventPic, select: () => void}) {

    return <div className={styles.c}>
        <Image src={getImageUrl(pic.image)} alt="" fill sizes={sizes} onClick={select}/>
        <GalleryRibbon slug={pic.slug} title={pic.title} className={styles.ribbon}/>
    </div>
}
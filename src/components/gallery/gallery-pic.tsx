import Image from "next/image";
import { GalleryImage } from "@/sanity/lib/types";
import { getImageUrl } from "@/utils/image-helpers";
import styles from './gallery-pic.module.css';
import GalleryRibbon from "./gallery-ribbon";

const sizes = '(max-width: 40rem) 10rem, (max-width: 64rem) 14rem, 16rem';

export default function GalleryPic({image, slug, title, select}: {
    image: GalleryImage, slug?: string, title?: string, select: () => void}) {

    return <div className={styles.c}>
        <Image src={getImageUrl(image)} alt={`Slika iz članka ${title}`} fill sizes={sizes} onClick={select}/>
        <GalleryRibbon slug={slug} title={title} className={styles.ribbon}/>
    </div>
}
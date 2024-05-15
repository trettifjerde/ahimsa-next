import Image from "next/image";
import { GalleryImage } from "@/sanity/lib/types";
import { getImageUrl } from "@/utils/image-helpers";
import styles from './gallery-pic.module.css';
import GalleryRibbon from "./gallery-ribbon";

export default function GalleryPic({image, slug, title, select}: {
    image: GalleryImage, slug?: string, title?: string, select: () => void}) {

    return <div className={styles.c}>
        <Image src={getImageUrl(image)} alt={`Slika iz članka ${title}`} fill onClick={select}/>
        <GalleryRibbon slug={slug} title={title} className={styles.ribbon}/>
    </div>
}
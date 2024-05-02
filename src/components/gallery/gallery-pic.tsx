import Link from "next/link";
import Image from "next/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { getImageUrl } from "@/utils/image-helpers";
import styles from './gallery-pic.module.css';

export default function GalleryPic({image, slug, title}: {image: SanityImageSource, slug: string, title: string}) {
    return <div className={styles.c}>
        <Image src={getImageUrl(image)} alt={`Slika iz članka ${title}`} fill/>
        <Link href={slug}><div>{title}</div></Link>
    </div>
}
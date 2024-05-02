'use client'

import Link from "next/link";
import Image from "next/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { getImageUrl } from "@/utils/image-helpers";
import styles from './gallery-pic.module.css';
import GalleryPortal from "./gallery-portal";
import { useState } from "react";

export default function GalleryPic({image, slug, title}: {image: SanityImageSource, slug: string, title: string}) {
    const [isZoomed, setIsZoomed] = useState(false);

    return <>
        <div className={styles.c}>
            <Image src={getImageUrl(image)} alt={`Slika iz članka ${title}`} fill onClick={() => setIsZoomed(true)}/>
            <Link href={slug}><div>{title}</div></Link>
        </div>
        <GalleryPortal visible={isZoomed} src={getImageUrl(image)} href={slug} title={title} close={() => setIsZoomed(false)}/>
    </>
}
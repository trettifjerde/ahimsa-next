'use client'

import Link from "next/link";
import Image from "next/image";
import { getFullImageUrl, getImageUrl } from "@/utils/image-helpers";
import styles from './gallery-pic.module.css';
import GalleryPortal from "./gallery-portal";
import { useState } from "react";
import { GalleryImage } from "@/sanity/lib/types";

export default function GalleryPic({image, slug, title, select}: {
    image: GalleryImage, slug?: string, title?: string, select: () => void}) {

    return <div className={styles.c}>
        <Image src={getImageUrl(image)} alt={`Slika iz članka ${title}`} fill onClick={select}/>
        {slug && title && <Link className={styles.ribbon} href={slug}><div>{title}</div></Link>}
        {!slug && title && <div className={styles.ribbon}><div>{title}</div></div>}
    </div>
}
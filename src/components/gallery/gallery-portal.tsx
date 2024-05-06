'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react"
import { createPortal } from "react-dom";
import styles from './portal.module.css';

export default function GalleryPortal({visible, src, title, href, close}: {
    visible: boolean, src: string, href?: string, title?: string, close: () => void
}) {
    console.log('portal', visible);
    const ref = useRef<Element | null>(null);

    useEffect(() => {
        ref.current = document.getElementById('galleryPortal') || null;
    }, []);

    return (visible && ref.current) ? createPortal(<div className={styles.p} onClick={close}>
        <div className={styles.c}>
            <button type="button" className={styles.btn}>X</button>

            <Image src={src} fill alt=""/>
            
            {href && title && <Link className={styles.ribbon} href={href}><div>{title}</div></Link>}
            {!href && title && <div className={styles.ribbon}><div>{title}</div></div>}
        </div>
    </div>, ref.current) : null;
}
'use client'

import { MouseEvent, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom";
import Image from "next/image";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { GalleryEventPic } from "@/sanity/lib/types";
import { getFullImageUrl } from "@/utils/image-helpers";
import styles from './portal.module.css';
import GalleryRibbon from "./gallery-ribbon";

export default function GalleryPortal({ pic, close, hasPrev, hasNext, toggleImage }: {
    pic: GalleryEventPic | null, close: () => void, hasPrev: boolean, hasNext: boolean, toggleImage: (n: number) => void
}) {
    const ref = useRef<Element | null>(null);
    const nodeRef = useRef<HTMLDivElement>(null);
    const picRef = useRef<HTMLImageElement>(null);
    const [curDir, setCurDir] = useState(1);

    const selectNext  = (n: number, e: MouseEvent) => {
        nodeRef.current?.style.setProperty('--fromX', `${-100 * n}%`);
        e.stopPropagation();
        setCurDir(n);
        toggleImage(n);
    }

    useEffect(() => {
        ref.current = document.body;
    }, [])


    return ref.current ? createPortal(<CSSTransition in={pic !== null} nodeRef={nodeRef} mountOnEnter unmountOnExit
        addEndListener={(done) => nodeRef.current?.addEventListener('animationend', done, false)}
        classNames={{
            enter: styles.modalEnter,
            exit: styles.modalExit
        }}>
        <div className={styles.p} onClick={close} ref={nodeRef}>
            {pic && <div className={styles.c}>
                <button type="button" className={styles.btn}>X</button>
                {hasPrev && <button type="button" className={styles.prev} onClick={(e) => selectNext(-1, e)}>L</button>}
                {hasNext && <button type="button" className={styles.next} onClick={(e) => selectNext(1, e)}>R</button>}

                <SwitchTransition>
                    <CSSTransition key={pic.id} nodeRef={picRef} classNames={{
                        enter: curDir > 0 ? styles.slideLeftIn : styles.slideRightIn,
                        exit: styles.slideOut,
                    }}
                        addEndListener={(done) => picRef.current?.addEventListener('animationend', done, false)}>
                        <Image src={getFullImageUrl(pic.image)} fill alt="" ref={picRef} />
                    </CSSTransition>
                </SwitchTransition>

                <GalleryRibbon slug={pic.slug} title={pic.title} className={styles.ribbon} />
            </div>}
        </div>
    </CSSTransition >, ref.current) : null;
}
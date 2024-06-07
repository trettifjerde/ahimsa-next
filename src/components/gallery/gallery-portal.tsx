'use client'

import { MouseEvent, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { GalleryEntryPic } from "@/sanity/lib/types";
import GalleryRibbon from "./gallery-ribbon";
import styles from './portal.module.css';
import CustomImage from "../ui/image/customImage";

export default function GalleryPortal({ pic, close, hasPrev, hasNext, toggleImage }: {
    pic: GalleryEntryPic | null, close: () => void, hasPrev: boolean, hasNext: boolean, toggleImage: (n: number) => void
}) {
    const ref = useRef<Element | null>(null);
    const nodeRef = useRef<HTMLDivElement>(null);
    const [curDir, setCurDir] = useState(1);

    const selectNext = (n: number, e: MouseEvent) => {
        nodeRef.current?.style.setProperty('--fromX', `${-50 * n}%`);
        e.stopPropagation();
        setCurDir(n);
        toggleImage(n);
    }

    useEffect(() => {
        ref.current = document.body;
    }, []);

    useEffect(() => {
        if (pic)
            document.documentElement?.classList.add('noscroll');
        else {
            document.documentElement?.classList.remove('noscroll');
        }
    }, [pic]);


    return ref.current ? createPortal(<CSSTransition in={pic !== null} nodeRef={nodeRef} mountOnEnter unmountOnExit
        addEndListener={(done) => nodeRef.current?.addEventListener('animationend', done, false)}
        classNames={{
            enter: styles.modalEnter,
            exit: styles.modalExit
        }}>
        <div className={styles.p} onClick={close} ref={nodeRef}>
            {pic && <div className={styles.c}>
                <button type="button" className={styles.btn}>✘</button>
                {hasPrev && <button type="button" className={styles.prev} onClick={(e) => selectNext(-1, e)}>❮</button>}
                {hasNext && <button type="button" className={styles.next} onClick={(e) => selectNext(1, e)}>❯</button>}

                <div className={styles.ic}>
                    <SwitchTransition>
                        <CSSTransition key={pic.id} classNames={{
                            enter: curDir > 0 ? styles.slideLeftIn : styles.slideRightIn,
                            exit: styles.slideOut,
                        }}
                            addEndListener={(node, done) => node.addEventListener('animationend', done, false)}>
                            
                            <CustomImage source={pic.image} full unoptimized />

                        </CSSTransition>
                    </SwitchTransition>
                </div>

                <GalleryRibbon slug={pic.slug} title={pic.title} className={styles.ribbon} />
            </div>}
        </div>
    </CSSTransition >, ref.current) : null;
}
'use client'

import { MouseEvent, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { GalleryEntryPic, ImageFullInfo } from "@/sanity/lib/types";
import GalleryRibbon from "./gallery-ribbon";
import styles from './portal.module.css';
import CustomImage from "../ui/image/customImage";

export default function GalleryPortal({ pic, close, hasPrev, hasNext, toggleImage }: {
    pic: GalleryEntryPic | null, close: () => void, hasPrev: boolean, hasNext: boolean, toggleImage: (n: number) => void
}) {
    const ref = useRef<Element | null>(null);
    const nodeRef = useRef<HTMLDivElement>(null);
    const [curDir, setCurDir] = useState(1);

    const selectNext = (n: number) => {
        nodeRef.current?.style.setProperty('--fromX', `${-50 * n}%`);
        setCurDir(n);
        toggleImage(n);
    }

    useEffect(() => {
        ref.current = document.body;
    }, []);

    useEffect(() => {
        if (pic)
            document.documentElement?.classList.add('noscroll');
        else
            document.documentElement?.classList.remove('noscroll');
    }, [pic]);

    return ref.current ? createPortal(<CSSTransition in={pic !== null} nodeRef={nodeRef}
        mountOnEnter unmountOnExit
        addEndListener={(done) => nodeRef.current?.addEventListener('animationend', done, false)}
        classNames={{
            enter: styles.modalEnter,
            exit: styles.modalExit
        }}>

        <div className={styles.p} onClick={close} ref={nodeRef}>
            <div className={styles.c}>
                <button type="button" className={styles.btn}>✘</button>

                {pic && <PortalInner pic={pic} curDir={curDir} selectNext={selectNext} 
                    hasPrev={hasPrev} hasNext={hasNext}/>}
            </div>
        </div>

    </CSSTransition>, ref.current) : null;
}

function PortalInner({ pic, curDir, selectNext, hasNext, hasPrev }: {
    pic: GalleryEntryPic,
    curDir: number
    selectNext: (n: number) => void,
    hasPrev: boolean,
    hasNext: boolean
}) {
    const icRef = useRef<HTMLDivElement>(null);
    const iciRef = useRef<HTMLDivElement>(null);
    const [zInfo, setZInfo] = useState(getZoomInfo(pic.image, icRef.current, false));

    const selectNextPic = (n: number, e: MouseEvent) => {
        e.stopPropagation();
        selectNext(n)
    }

    useEffect(() => {
        setZInfo(getZoomInfo(pic.image, icRef.current, false));
    }, [pic]);

    return <>
        {hasPrev && !zInfo?.isZoomed && 
            <button type="button" className={styles.prev} onClick={(e) => selectNextPic(-1, e)}>❮</button>}

        {hasNext && !zInfo?.isZoomed && 
            <button type="button" className={styles.next} onClick={(e) => selectNextPic(1, e)}>❯</button>}

        <div className={styles.ic} ref={icRef}>
            <SwitchTransition>
                <CSSTransition key={pic.id}
                    nodeRef={iciRef}
                    classNames={{
                        enter: curDir > 0 ? styles.slideLeftIn : styles.slideRightIn,
                        exit: styles.slideOut,
                    }}
                    addEndListener={(done) => iciRef.current?.addEventListener('animationend', done, false)}>
                    <div className={styles.ici} ref={iciRef} style={{ overflow: zInfo && zInfo.isZoomed ? 'auto' : 'hidden' }}>

                        {zInfo && <CustomImage source={pic.image} full
                            width={zInfo.width} height={zInfo.height}
                            unoptimized
                            style={{
                                cursor: zInfo.zoomable ? (zInfo.isZoomed ? 'zoom-out' : 'zoom-in') : undefined
                            }}

                            onClick={zInfo.zoomable ? (e) => {
                                e.stopPropagation();
                                setZInfo((prev) => getZoomInfo(pic.image, icRef.current, !prev?.isZoomed))
                            } : undefined} />}

                    </div>
                </CSSTransition>
            </SwitchTransition>
        </div>

        <GalleryRibbon slug={pic.slug} title={pic.title} className={`${styles.ribbon} ${zInfo && zInfo.isZoomed ? styles.hid : ''}`} />
    </>
}

function getZoomInfo(img: ImageFullInfo, cont: HTMLDivElement | null, isZoomed: boolean) {

    if (cont && img && img.width && img.height) {
        if (isZoomed) 
            return {
                width: img.width,
                height: img.height,
                zoomable: true,
                isZoomed
            }

        const coef = Math.max((img.width / cont.offsetWidth), (img.height / cont.offsetHeight));

        if (coef > 1)
            return {
                width: Math.round(img.width / coef),
                height: Math.round(img.height / coef),
                zoomable: true,
                isZoomed
            }

        return {
            width: img.width,
            height: img.height,
            zoomable: false,
            isZoomed
        }
    }

    return undefined;
}
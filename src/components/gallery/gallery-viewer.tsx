'use client'

import { GalleryEventPic } from "@/sanity/lib/types";
import { MouseEvent, useRef, useState } from "react";
import GalleryPic from "./gallery-pic";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import styles from './portal.module.css';
import Image from "next/image";
import { getFullImageUrl } from "@/utils/image-helpers";
import Link from "next/link";

export default function GalleryViewer({ pics, emptyClass }: { pics: GalleryEventPic[], emptyClass?: string }) {
    const [curI, setCurI] = useState<number | null>(null);
    const portalRef = useRef<HTMLDivElement>(null);
    const picRef = useRef<HTMLImageElement>(null);

    const toggleImage = (n: number, e: MouseEvent) => {
        e.stopPropagation();
        setCurI((prev) => {
            if (prev !== null)
                return prev + n;
            return null;
        });
    }

    return <>
        {pics.map((pic, i) => <GalleryPic key={pic.id} image={pic.image} slug={pic.slug} title={pic.title}
            select={() => setCurI(i)} />)}
        {emptyClass && pics.length === 0 && <div className={emptyClass}>Nema objavljenih slika</div>}

        <CSSTransition in={curI !== null} nodeRef={portalRef} mountOnEnter unmountOnExit
            addEndListener={(done) => portalRef.current?.addEventListener('animationend', done, false)}
            classNames={{
                enter: styles.modalEnter,
                exit: styles.modalExit
            }}>

            <div className={styles.p} onClick={() => setCurI(null)} ref={portalRef}>
                {curI !== null && <div className={styles.c}>
                    <button type="button" className={styles.btn}>X</button>
                    {curI > 0 && <button type="button" className={styles.prev} onClick={(e) => toggleImage(-1, e)}>L</button>}
                    {curI < pics.length - 1 && <button type="button" className={styles.next} onClick={(e) => toggleImage(1, e)}>R</button>}

                    <SwitchTransition>
                        <CSSTransition key={pics[curI].id} nodeRef={picRef} classNames={{
                            enter: styles.slideUp,
                            exit: styles.slideDown,
                        }}
                            addEndListener={(done) => picRef.current?.addEventListener('animationend', done, false)}>
                            <Image src={getFullImageUrl(pics[curI].image)} fill alt="" ref={picRef} />
                        </CSSTransition>
                    </SwitchTransition>

                    {pics[curI].slug && pics[curI].title && <Link className={styles.ribbon} href={pics[curI].slug!}><div>{pics[curI].title}</div></Link>}
                    {!pics[curI].slug && pics[curI].title && <div className={styles.ribbon}><div>{pics[curI].title}</div></div>}
                </div>}
            </div>
        </CSSTransition>
    </>
}
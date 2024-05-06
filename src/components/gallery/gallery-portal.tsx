'use client'

import { useEffect, useRef } from "react"
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { GalleryEventPic } from "@/sanity/lib/types";
import { getFullImageUrl } from "@/utils/image-helpers";
import styles from './portal.module.css';

export default function GalleryPortal({ pic, close, setNext, setPrev }: {
    pic: GalleryEventPic, close: () => void, setPrev?: () => void, setNext?: () => void
}) {
    const nodeRef = useRef<HTMLDivElement>(null);


    return <div className={styles.p} onClick={close}>
        <SwitchTransition>
            <CSSTransition key={pic.id} nodeRef={nodeRef} classNames={{
                appear: styles.appear,
                appearDone: styles.appearDone,
                enter: styles.enter,
                enterDone: styles.enterDone,
                exit: styles.exit,
                exitDone: styles.exitDone
            }}
                addEndListener={(done) => nodeRef.current?.addEventListener('animationend', done, false)}>

                <div className={styles.c} ref={nodeRef}>
                    {pic && <>
                        <button type="button" className={styles.btn}>X</button>
                        {setPrev && <button type="button" className={styles.prev} onClick={(e) => { e.stopPropagation(); setPrev() }}>L</button>}
                        {setNext && <button type="button" className={styles.next} onClick={(e) => { e.stopPropagation(); setNext() }}>R</button>}

                        <Image src={getFullImageUrl(pic.image)} fill alt="" />

                        {pic.slug && pic.title && <Link className={styles.ribbon} href={pic.slug}><div>{pic.title}</div></Link>}
                        {!pic.slug && pic.title && <div className={styles.ribbon}><div>{pic.title}</div></div>}
                    </>}
                </div>
                </CSSTransition>
            </SwitchTransition>
        </div>
}
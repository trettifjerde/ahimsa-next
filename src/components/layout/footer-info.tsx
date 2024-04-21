'use client'

import { PointerEventHandler, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

export default function FooterInfo() {
    const [popup, setPopup] = useState(false);
    const [popupText, setPopupText] = useState('');
    const timer = useRef<any>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    const copyData : PointerEventHandler = async(e) => {
        if (timer.current) 
            clearTimeout(timer.current);

        const target = e.target as HTMLSpanElement;
        const text = (e.target as HTMLSpanElement).textContent;

        if (!text)
            return;

        const msg = await new Promise<void>(async (resolve, reject) => {
            try {
                await navigator.clipboard.writeText(text);
                resolve();
            }
            catch(err) {
                reject();
            }
        })
        .then(() => 'Copied!')
        .catch(err => {
            try {
                const range = document.createRange();
                range.selectNodeContents(target);
                getSelection()?.removeAllRanges();
                getSelection()?.addRange(range);
            }
            catch {}

            return 'Failed to copy - do it manually';
        });

        popupRef.current?.style.setProperty('top', `${target.offsetTop - 50}px`);
        popupRef.current?.style.setProperty('left', `${target.offsetLeft}px`);
        setPopup(true);
        setPopupText(msg);
        timer.current = setTimeout(() => setPopup(false), 3000);
    }

    return <>
        <div className="info">
            <div>
                <i className="icon-mail" /><span onPointerDown={copyData}>{process.env.NEXT_PUBLIC_EMAIL}</span>
                <i className="icon-phone"/><span onPointerDown={copyData}>{process.env.NEXT_PUBLIC_PHONE}</span>
                <i className="icon-compass"/><span onPointerDown={copyData}>{process.env.NEXT_PUBLIC_ADDRESS}</span>
            </div>
            <div>
                <b>OIB:</b><span onPointerDown={copyData}>{process.env.NEXT_PUBLIC_OIB}</span>
                <b>IBAN:</b><span onPointerDown={copyData}>{process.env.NEXT_PUBLIC_IBAN}</span>
            </div>
        </div>
        <CSSTransition nodeRef={popupRef} in={popup} timeout={300}>
            <div ref={popupRef} className="popup">
                {popupText}
            </div>
        </CSSTransition>
    </>
}
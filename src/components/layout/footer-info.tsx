'use client'

import { PointerEventHandler, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { ContactOtherInfo, FooterInfo as FI } from "@/sanity/lib/types";

type IconFieldType = 'address' | 'email' | 'phone';
const mainFields : IconFieldType[] = ['address', 'email', 'phone']; 

export default function FooterInfo({info}: {info: FI}) {

    const [popup, setPopup] = useState(false);
    const [popupText, setPopupText] = useState('');
    const timer = useRef<any>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    const copyData: PointerEventHandler = async (e) => {
        if (timer.current)
            clearTimeout(timer.current);

        const target = e.currentTarget as HTMLSpanElement;
        const text = (e.currentTarget as HTMLSpanElement).textContent;

        if (!text)
            return;

        const msg = await new Promise<void>(async (resolve, reject) => {
            try {
                await navigator.clipboard.writeText(text);
                resolve();
            }
            catch (err) {
                reject();
            }
        })
            .then(() => 'Copied!')
            .catch(err => 'Failed to copy - do it manually');

        popupRef.current?.style.setProperty('top', `${target.offsetTop - 50}px`);
        popupRef.current?.style.setProperty('left', `${target.offsetLeft}px`);
        setPopup(true);
        setPopupText(msg);
        timer.current = setTimeout(() => setPopup(false), 3000);
    }

    return <>
        <div className="info">
            <div>
                {
                    mainFields
                    .filter(field => !!info[field])
                    .map(type => <FooterIconEntry key={type} type={type} value={info[type] || ''} copyData={copyData} />)
                }
            </div>
            <div>
                { info.other.map(info => <FooterTextEntry key={info.name} info={info} copyData={copyData}/> ) }
            </div>
        </div>
        <CSSTransition nodeRef={popupRef} in={popup} timeout={300}>
            <div ref={popupRef} className="popup">
                {popupText}
            </div>
        </CSSTransition>
    </>
}

function FooterIconEntry({ type, value, copyData }: { 
    type: 'address' | 'email' | 'phone', value: string, copyData: PointerEventHandler }) {
    return <>
        <i className={`icon-${type}`} />
        <span onPointerDown={copyData}>
            {value}
        </span>
    </>
}

function FooterTextEntry({ info, copyData }: { info: ContactOtherInfo, copyData: PointerEventHandler }) {
    return <>
        <b>{info.name}</b>
        <span onPointerDown={copyData}>{info.value}</span>
    </>
}
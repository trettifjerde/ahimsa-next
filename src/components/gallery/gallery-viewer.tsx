'use client'

import { useCallback, useState } from "react";
import { GalleryEventPic } from "@/sanity/lib/types";
import GalleryPic from "./gallery-pic";
import GalleryPortal from "./gallery-portal";

export default function GalleryViewer({ pics, emptyClass }: { pics: GalleryEventPic[], emptyClass?: string }) {
    const [curI, setCurI] = useState<number | null>(null);

    const toggleImage = useCallback((n: number) => {
        setCurI((prev) => {
            if (prev !== null)
                return prev + n;
            return null;
        });
    }, []);

    return <>
        {pics.map((pic, i) => <GalleryPic key={pic.id} pic={pic}
            select={() => setCurI(i)} />)}

        {emptyClass && pics.length === 0 && <div className={emptyClass}>Nema objavljenih slika</div>}

        <GalleryPortal pic={curI === null ? null : pics[curI]}
            close={() => setCurI(null)}
            hasPrev={curI !== null && curI > 0}
            hasNext={curI !== null && curI < pics.length - 1}
            toggleImage={toggleImage}
        />
    </>
}
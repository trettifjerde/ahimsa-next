'use client'

import { useCallback, useState } from "react";
import { GalleryEntryPic } from "@/sanity/lib/types";
import GalleryPic from "./gallery-pic";
import GalleryPortal from "./gallery-portal";

export function GalleryViewerClient({ pics }: { pics: GalleryEntryPic[] }) {
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

            <GalleryPortal pic={curI === null ? null : pics[curI]}
                close={() => setCurI(null)}
                hasPrev={curI !== null && curI > 0}
                hasNext={curI !== null && curI < pics.length - 1}
                toggleImage={toggleImage}
            />
        </>
}
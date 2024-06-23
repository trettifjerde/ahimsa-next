import { Suspense } from "react";
import styles from './h.module.css';
import leafStyles from '@/styles/leaf.module.css';
import { PortableText } from "@portabletext/react";
import { PortableBlockText } from "@/sanity/lib/types";

type Props = {textPromise: Promise<PortableBlockText>};

export default function HighlightBlock({textPromise}: Props) {
    return <article className={`${leafStyles.lf} ${styles.h}`}>
        <Suspense fallback={<HighlightSkeleton />}>
            <Highlight textPromise={textPromise} />
        </Suspense>
    </article>
}

async function Highlight({ textPromise }: Props) {
    const text = await textPromise;

    return text ? <PortableText value={text} /> : <p>Nema informacija</p>
}

function HighlightSkeleton() {
    return <div className={`${styles.sk} shmr`}></div>
}
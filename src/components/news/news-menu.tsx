'use client'

import { useRouter, useSearchParams } from "next/navigation";
import styles from './news-menu.module.css';
import NewsLink from "./news-link";
import { useEffect, useState } from "react";

export default function NewsMenu({years}: {years: number[]}) {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [navigating, setNavigating] = useState(false);
    const [loading, setLoading] = useState(false);
    const yearStr = searchParams.get('year');
    const year = !yearStr ? 0 : +yearStr;


    const goTo = (y: number) => {
        setNavigating(true);
        if (!y)
            router.push('/news');
        else
            router.push(`/news?year=${y}`);
    }

    useEffect(() => {
        if (navigating) {
            const timer = setTimeout(() => setLoading(true), 250);
            return () => clearTimeout(timer);
        }
    }, [navigating]);

    useEffect(() => {
        setNavigating(false);
        setLoading(false);
    }, [searchParams]);

    return <div className={styles.menu}>
        <ul className="menu">
            <NewsLink active={year === 0} onClick={() => goTo(0)}>Sve</NewsLink>
            {years.map(y => <NewsLink key={y} active={y === year} onClick={() => goTo(y)}>{y}</NewsLink>)}
            {loading && <div className={styles.l}></div>}
        </ul>

    </div>
}
'use client';

import { ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { UDRUGA_ALL_YEARS } from "@/utils/clientHelpers";
import styles from './year-menu.module.css';

export function YearMenu({url}: {url: string}) {

    const router = useRouter();
    const searchParams = useSearchParams();
    const year = +(searchParams.get('year') || '0');
    const [navigating, setNavigating] = useState(false);
    const [loading, setLoading] = useState(false);

    const goTo = (y: number) => {
        setNavigating(true);
        if (!y)
            router.push(url);
        else
            router.push(`${url}?year=${y}`);
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
            <YearLink active={year === 0} onClick={() => goTo(0)}>Sve</YearLink>
            {UDRUGA_ALL_YEARS.map(y => <YearLink key={y} active={y === year} onClick={() => goTo(y)}>{y}</YearLink>)}
            {loading && <div className={styles.l}></div>}
        </ul>
    </div>
}

function YearLink({children, active, onClick}: {children: ReactNode, active: boolean, onClick: () => void}) {
    return <li className={`${active ? 'active' : ''}`} onClick={onClick}>
        {children}
    </li>
}
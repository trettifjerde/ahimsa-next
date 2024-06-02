'use client';

import { ReactNode, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { UDRUGA_ALL_YEARS } from "@/utils/clientHelpers";
import styles from './year-menu.module.css';
import menuStyles from '@/styles/menu.module.css';
import shimmerStyles from '@/styles/shimmer.module.css';

export function YearMenu({url}: {url: string}) {

    const router = useRouter();
    const {year} = useParams<{year?: string}>();
    const [navigating, setNavigating] = useState(false);
    const [loading, setLoading] = useState(false);

    const goTo = (y?: number) => {
        setNavigating(true);
        if (y)
            router.push(`${url}/${y}`);
        else 
            router.push(`${url}`);
    }

    useEffect(() => {
        if (navigating) {
            const timer = setTimeout(() => setLoading(true), 200);
            return () => clearTimeout(timer);
        }
    }, [navigating]);

    useEffect(() => {
        setNavigating(false);
        setLoading(false);
    }, [year]);

    return <div className={styles.menu}>
        <ul className={menuStyles.menu}>
            <YearLink active={!year} onClick={() => goTo()}>Sve</YearLink>
            {UDRUGA_ALL_YEARS.map(y => <YearLink key={y} active={y.toString() === year} onClick={() => goTo(y)}>{y}</YearLink>)}
            {loading && <div className={shimmerStyles.l}></div>}
        </ul>
    </div>
}

function YearLink({children, active, onClick}: {children: ReactNode, active: boolean, onClick: () => void}) {
    return <li className={active ? menuStyles.active : ''} onClick={onClick}>
        {children}
    </li>
}
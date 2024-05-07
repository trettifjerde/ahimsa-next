'use client';

import { ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { UDRUGA_ALL_YEARS } from "@/utils/clientHelpers";
import styles from './year-menu.module.css';
import menuStyles from '@/styles/menu.module.css';
import shimmerStyles from '@/styles/shimmer.module.css';

export function YearMenu({url}: {url: string}) {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [navigating, setNavigating] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const year = searchParams.get('year');

    const goTo = (y: string) => {
        setNavigating(true);
        router.push(`${url}?year=${y}`);
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
    }, [searchParams]);

    return <div className={styles.menu}>
        <ul className={menuStyles.menu}>
            <YearLink active={!year || year === 'all'} onClick={() => goTo('all')}>Sve</YearLink>
            {UDRUGA_ALL_YEARS.map(y => <YearLink key={y} active={y === year} onClick={() => goTo(y)}>{y}</YearLink>)}
            {loading && <div className={shimmerStyles.l}></div>}
        </ul>
    </div>
}

function YearLink({children, active, onClick}: {children: ReactNode, active: boolean, onClick: () => void}) {
    return <li className={active ? menuStyles.active : ''} onClick={onClick}>
        {children}
    </li>
}
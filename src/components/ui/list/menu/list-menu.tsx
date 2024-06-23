'use client';

import { memo, useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from './menu.module.css';
import menuStyles from '@/styles/menu.module.css';

type ListItemInfo = {
    name: string,
    url: string, 
    cssVars?: {[key: string]: string},
};

export function ListMenu({url, list, paramName, isSticky, isVert, isGrowing}: {
    url: string, 
    list: ListItemInfo[],
    paramName: string,
    isVert?: boolean,
    isSticky?: boolean,
    isGrowing?: boolean
}) {

    const router = useRouter();
    const params = useParams();
    const curParam = params[paramName] || '';
    const [navigating, setNavigating] = useState(false);
    const [loading, setLoading] = useState(false);

    const goTo = useCallback((p: string) => {
        setNavigating(true);
        if (p)
            router.push(`${url}/${p}`);
        else 
            router.push(`${url}`);
    }, [url]);

    useEffect(() => {
        if (navigating) {
            const timer = setTimeout(() => setLoading(true), 200);
            return () => clearTimeout(timer);
        }
    }, [navigating]);

    useEffect(() => {
        setNavigating(false);
        setLoading(false);
    }, [params]);

    return <div className={`${styles.menu} ${isSticky ? styles.st : ''} ${isVert ? styles.vert: ''} ${isGrowing ? styles.gr : ''}`}>
        <ul className={menuStyles.ul}>

            {list.map(l => <ListLink key={l.name} info={l} goTo={goTo}
                activeStyle={`${menuStyles.active} ${styles.active}`} active={l.url === curParam}
            />)}

            {loading && <div className="shmr"></div>}
        </ul>
    </div>
}

const ListLink = memo(({info, active, goTo, activeStyle}: {
    info: ListItemInfo, active: boolean, 
    goTo: (p: string) => void,
    activeStyle: string 
}) => {
    const style = info.cssVars ? info.cssVars as React.CSSProperties : {};

    return <li className={active ? activeStyle : ''} style={style} onClick={() => goTo(info.url)}>
        {info.name}
    </li>
});
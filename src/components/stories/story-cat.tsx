'use client';

import Link from "next/link";
import styles from './sci.module.css';
import { useContext } from "react";
import { CategoriesContext } from "./stories-context";
import menuStyles from '@/styles/menu.module.css';

export default function StoryCategoryItem({id}: {id: string}) {

    const categories = useContext(CategoriesContext);
    const cat = categories[id];

    return <Link className={styles.i} href={`/stories${cat.name ? `/${cat.name}` : ''}`}>
        <li className={menuStyles.active} style={{'--color': cat.color} as React.CSSProperties}>
            {cat.name}
        </li>
    </Link>
}
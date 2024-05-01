import { ReactNode } from "react";
import styles from './news-grid.module.css';

export default function NewsGrid({children}: {children: ReactNode}) {
    return <div className={styles.g}>
        {children}
    </div>
}
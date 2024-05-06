import { ReactNode } from "react";
import styles from './news-grid.module.css';

export default function NewsGrid({children, className}: {children: ReactNode, className?: string}) {
    return <div className={`${styles.g} ${className || ''}`}>
        {children}
    </div>
}
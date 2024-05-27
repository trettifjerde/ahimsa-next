import { ReactNode } from "react";
import styles from './gallery-grid.module.css';

export default function GalleryGrid({children, className}: {children: ReactNode, className?: string}) {
    return <div className={`${styles.g} ${className || ''}`}>
        {children}
    </div>
}
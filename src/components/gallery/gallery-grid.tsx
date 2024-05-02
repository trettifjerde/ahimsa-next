import { ReactNode } from "react";
import styles from './gallery-grid.module.css';

export default function GalleryGrid({children}: {children: ReactNode}) {
    return <div className={styles.g}>{children}</div>
}
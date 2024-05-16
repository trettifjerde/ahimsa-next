import { ReactNode } from "react";
import styles from './gallery-grid.module.css';
import GallerySkeletonPic from "./gallery-skeleton-pic";

export default function GalleryGrid({children, className}: {children: ReactNode, className?: string}) {
    return <div className={`${styles.g} ${className || ''}`}>
        {children}
    </div>
}
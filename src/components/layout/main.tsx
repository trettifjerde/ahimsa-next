import { ReactNode } from "react";
import styles from './main.module.css';
import leafStyles from '@/styles/leaf.module.css';

export default function Main({ shortPadding, short, className, children }: { 
    shortPadding?: boolean,
    short?: boolean, 
    className?: string, 
    children: ReactNode 
}) {
    return <main className={`${leafStyles.lf} ${styles.m} ${short ? styles.sh : ''} ${shortPadding ? styles.shp : ''} ${className || ''}`}>
        {children}
    </main>
}
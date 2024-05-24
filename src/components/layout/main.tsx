import { ReactNode } from "react";
import styles from './main.module.css';
import leafStyles from '@/styles/leaf.module.css';

export default function Main({ short, className, children }: { short?: boolean, className?: string, children: ReactNode }) {
    return <main className={`${leafStyles.lf} ${styles.m} ${short ? styles.sh : ''} ${className || ''}`}>
        {children}
    </main>
}
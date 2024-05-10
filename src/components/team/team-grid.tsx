import { ReactNode } from 'react';
import styles from './grid.module.css';

export default function TeamGrid({children}: {children: ReactNode}) {
    return <div className={styles.g}>
        {children}
    </div>
}
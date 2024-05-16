import { ReactNode } from 'react';
import leafStyles from '@/styles/leaf.module.css';
import styles from './s.module.css';

export default function IndexSection({children}: {children: ReactNode}) {
    return <section className={`${leafStyles.lf} ${styles.s}`}>{children}</section>
}
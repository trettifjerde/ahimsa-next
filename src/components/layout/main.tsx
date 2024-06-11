import { ReactNode } from "react";
import styles from './main.module.css';
import leafStyles from '@/styles/leaf.module.css';

export default function Main({ noPadding, short, className, children }: { 
    noPadding?: boolean,
    short?: boolean, 
    className?: string, 
    children: ReactNode 
}) {

    const classNames = [leafStyles.lf, styles.m];

    if (short)
        classNames.push(styles.sh);

    if (noPadding)
        classNames.push(styles.np);

    if (className)
        classNames.push(className);
    
    return <main className={classNames.join(' ')}>
        {children}
    </main>
}
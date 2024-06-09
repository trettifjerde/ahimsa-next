import { ReactNode } from "react";
import styles from './main.module.css';
import leafStyles from '@/styles/leaf.module.css';

export default function Main({ shortPadding, short, className, children }: { 
    shortPadding?: boolean,
    short?: boolean, 
    className?: string, 
    children: ReactNode 
}) {

    const classNames = [leafStyles.lf, styles.m];

    if (short)
        classNames.push(styles.sh);

    if (shortPadding)
        classNames.push(styles.shp);

    if (className)
        classNames.push(className);
    
    return <main className={classNames.join(' ')}>
        {children}
    </main>
}
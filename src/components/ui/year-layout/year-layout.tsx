import { ReactNode, Suspense } from "react";
import { YearMenu } from "../year-menu/year-menu";
import styles from './year-layout.module.css';

export default function YearGrid({header, children, url, gridStyle}: {
    header: string, children: ReactNode, url: string, gridStyle: string
}) {
    
    return <>
        <h1>{header}</h1>
        <div className={styles.c}>
            <div className={gridStyle}>
                {children}
            </div>
            
            <Suspense>
                <YearMenu url={url} />
            </Suspense>
        </div>
    </>
}
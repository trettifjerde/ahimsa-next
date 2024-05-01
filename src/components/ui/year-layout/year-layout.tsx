import { ComponentType, ReactNode, Suspense } from "react";
import { YearMenu } from "../year-menu/year-menu";
import styles from './year-layout.module.css';

export default function YearGrid({header, children, url, GridComponent}: {
    header: string, children: ReactNode, url: string, GridComponent: ComponentType<{children: ReactNode}>
}) {
    
    return <>
        <h1>{header}</h1>
        <div className={styles.c}>
            <GridComponent>
                {children}
            </GridComponent>
            
            <Suspense>
                <YearMenu url={url} />
            </Suspense>
        </div>
    </>
}
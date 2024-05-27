import { ComponentType, ReactNode, Suspense } from "react";
import { YearMenu } from "../menu/year-menu";
import styles from './year-layout.module.css';
import MainBlock from "@/components/layout/main-bl";
import Main from "@/components/layout/main";

export default function YearLayout({ header, children, url, GridComponent, Fallback }: {
    header: string, children: ReactNode, url: string, 
    GridComponent: ComponentType<{ children: ReactNode, className?: string }>,
    Fallback: ComponentType
}) {

    return <Main>
        <MainBlock>
            <h1>{header}</h1>
            <div className={styles.c}>
                <GridComponent className={styles.g}>
                    <Suspense fallback={<Fallback />}>
                        {children}
                    </Suspense>
                </GridComponent>

                <Suspense>
                    <YearMenu url={url} />
                </Suspense>
            </div>
        </MainBlock>
    </Main>
}
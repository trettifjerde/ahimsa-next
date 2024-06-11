import { ReactNode, Suspense } from "react";
import { ListMenu } from "../menu/list-menu";
import MainBlock from "@/components/layout/main-bl";
import Main from "@/components/layout/main";
import styles from './layout.module.css';
import { UDRUGA_ALL_YEARS } from "@/utils/env-fallback";

const list = [{name: 'Sve', url: ''}, ...UDRUGA_ALL_YEARS.map(year => ({name: year, url: year}))];

export default function ListLayout({ children, url }: {
    children: ReactNode, url: string,
}) {

    return <Main noPadding>
        <MainBlock>
            <div className={styles.c}>
                <div className={styles.g}>
                    {children}
                </div>

                <Suspense>
                    <ListMenu url={url} list={list} paramName="year" isSticky isVert />
                </Suspense>
            </div>
        </MainBlock>
    </Main>
}
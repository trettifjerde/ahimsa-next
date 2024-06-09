import Link from "next/link";
import Main from "../layout/main";
import MainBlock from "../layout/main-bl";
import styles from './l.module.css';
import { Button } from "../ui/buttons";
import { ReactNode } from "react";

export default function ArticlePageLayout({url, text, children}: {
    url: string,
    text: string,
    children: ReactNode
}) {
    return <Main>
        <MainBlock>
            <div className={styles.back}>
                <Link href={url}>
                    <Button isSmall>{text}</Button>
                </Link>
            </div>
            {children}
        </MainBlock>
    </Main>
}
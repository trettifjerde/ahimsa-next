import { ReactNode, Suspense } from "react";
import styles from './news.module.css';
import NewsMenu from "@/components/news/news-menu";

export default function NewsLayout({children}: {children: ReactNode}) {
    const years = getYears();

    return <>
        <h1>Novosti</h1>
        <div className={styles.c}>
            {children}
            <Suspense>
                <NewsMenu years={years} />
            </Suspense>
        </div>
    </>
}

function getYears() {
    const years : number[] = [];
    const curYear = new Date().getFullYear();
    for (let y = curYear; y >= 2016; y--) 
        years.push(y);
    return years;
}
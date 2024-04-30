import { ReactNode } from "react";
import styles from './p.module.css';
import YearLayout from "@/components/ui/year-layout/year-layout";

export default function NewsLayout({children}: {children: ReactNode}) {
    return <YearLayout header="Novosti" url="/news" gridStyle={styles.g}>
        {children}
    </YearLayout>
}
import MainBlock from "@/components/layout/main-bl";
import Main from "@/components/layout/main";
import { ReactNode, Suspense } from "react";
import { getCategoriesDict } from "@/sanity/lib/fetches";
import { ListMenu } from "@/components/ui/list/menu/list-menu";
import styles from './l.module.css';

const allCatColor = '85,176,179';

export default async function StoriesLayout({ children }: { children: ReactNode }) {

    const categories = await getCategoriesDict();
    const catsInfo = [
        { name: 'Sve', url: '', cssVars: { '--color': allCatColor } },
        ...Object.values(categories).map(({ name, slug, color }) => ({
            name,
            url: slug,
            cssVars: { '--color': color }
        }))];

    return <Main>
        <MainBlock>
            <h1>Naše priče</h1>

            <div>
                {catsInfo && <div className={styles.c}>
                    <h5>Kategorije</h5>
                    <Suspense>
                        <ListMenu url="/stories" paramName="slug" list={catsInfo} isGrowing />
                    </Suspense>
                </div>}

                {children}
            </div>
        </MainBlock>
    </Main>
}
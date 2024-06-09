import StoryCategoryItem from "./story-cat";
import styles from './scg.module.css';
import menuStyles from '@/styles/menu.module.css';
import { StoryCategoriesIds } from "@/sanity/lib/types";

export default function StoryCategoriesGrid({categoryIds, className}: {
    categoryIds: StoryCategoriesIds,
    className?: string
}) {
    return <ul className={`${menuStyles.ul} ${styles.ul} ${className || ''}`}>
        {categoryIds.map(id => <StoryCategoryItem key={id} id={id} />)}
    </ul>
}
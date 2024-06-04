import { StoryPreview } from "@/sanity/lib/types";
import StoryCategoryItem from "./story-cat";
import styles from './si.module.css';
import Image from "next/image";
import { getImageUrl } from "@/utils/image-helpers";
import menuStyles from '@/styles/menu.module.css';
import Link from "next/link";
import leafStyles from '@/styles/leaf.module.css';

export default function StoryItem({ story }: { story: StoryPreview }) {
    return <div className={`${styles.c} ${leafStyles.lf}`}>
        <div className={styles.ci}>
            <Link href={`/stories/article/${story.slug}`}>

                <div className={styles.ic}>
                    <Image src={getImageUrl(story.image)} fill alt="Dekorativna slika" />
                </div>

                <h4>{story.title}</h4>

                <div className={styles.ex}>{story.excerpt}</div>
            </Link>

            <ul className={`${menuStyles.ul} ${styles.ul}`}>
                {story.categories.map(cat => <StoryCategoryItem key={cat._ref} id={cat._ref} />)}
            </ul>
        </div>
    </div>
}
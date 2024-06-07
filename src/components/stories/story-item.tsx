import Link from "next/link";
import { StoryPreview } from "@/sanity/lib/types";
import StoryCategoryItem from "./story-cat";
import CustomImage from "../ui/image/customImage";
import styles from './si.module.css';
import menuStyles from '@/styles/menu.module.css';
import leafStyles from '@/styles/leaf.module.css';
import listItemStyles from '@/styles/list-item.module.css';

const sizes = '16rem';

export default function StoryItem({ story }: { story: StoryPreview }) {
    const date = new Date(story.date).toLocaleDateString('hr', { dateStyle: 'long' });
    
    return <div className={`${leafStyles.lf} ${listItemStyles.clf} ${listItemStyles.c} ${styles.c}`}>
        <div className={`${listItemStyles.ci} ${styles.fl}`}>
            <Link className={styles.fl} href={`/stories/article/${story.slug}`}>

                <div className={listItemStyles.ic}>
                    <CustomImage source={story.image} square sizes={sizes}/>
                </div>

                <div>
                    <div className={listItemStyles.d}>{date}</div>
                    <h4>{story.title}</h4>
                </div>

                <div className={listItemStyles.desc}>
                    <p>
                        {story.excerpt}
                    </p>
                </div>
            </Link>

            <ul className={`${menuStyles.ul} ${styles.ul}`}>
                {story.categories.map(cat => <StoryCategoryItem key={cat} id={cat} />)}
            </ul>
        </div>
    </div>
}
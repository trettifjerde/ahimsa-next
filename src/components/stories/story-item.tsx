import Link from "next/link";
import { StoryPreview } from "@/sanity/lib/types";
import CustomImage from "../ui/image/customImage";
import styles from './si.module.css';
import leafStyles from '@/styles/leaf.module.css';
import listItemStyles from '@/styles/list-item.module.css';
import StoryCategoriesGrid from "./story-cats";
import { ReactNode } from "react";

const sizes = '16rem';

export default function StoryItem({ story }: { story: StoryPreview | null }) {
    const date = story ? new Date(story.date).toLocaleDateString('hr', { dateStyle: 'long' }) : '';
    
    return <div className={`${leafStyles.lf} ${listItemStyles.clf} ${listItemStyles.c} ${styles.c}`}>
        <div className={`${listItemStyles.ci} ${styles.fl}`}>
            <StoryWrapper story={story}>

                <div className={listItemStyles.ic}>
                    <CustomImage source={story?.image} square sizes={sizes}/>
                </div>

                <div>
                    <div className={listItemStyles.d}>{date}</div>
                    <h4>{story?.title || ''}</h4>
                </div>

                <div className={listItemStyles.desc}>
                    {story?.excerpt && <p>
                        {story.excerpt}
                    </p>}
                </div>
            </StoryWrapper>

            {story && <StoryCategoriesGrid categoryIds={story.categories} />}

            {!story && <>
                <div className={styles.empcat}></div>
                <div className="shmr"></div>
            </>}
        </div>
    </div>
}

function StoryWrapper({story, children}: {story: StoryPreview | null, children: ReactNode}) {
    if (story)
        return <Link className={styles.fl} href={`/stories/article/${story.slug}`}>
            {children}
        </Link>

    return <div className={styles.fl}>{children}</div>
}
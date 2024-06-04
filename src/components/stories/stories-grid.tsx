import { getStories } from '@/sanity/lib/fetches';
import { StoriesListQueryParams } from '@/utils/types';
import styles from './sg.module.css';
import StoryItem from './story-item';

export default async function StoriesGrid({fetchParams}: {fetchParams?: StoriesListQueryParams}) {
    const stories = await getStories(fetchParams);

    if (!stories)
        throw new Error('');

    return <>
        {stories.length > 0 && <div className={styles.g}>
            {stories.map(story => <StoryItem key={story.slug} story={story}/>)}
        </div>}
    
        {stories.length === 0 && <div className={styles.emp}>No stories in this category</div>}
    </>
}
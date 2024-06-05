import { getStories } from '@/sanity/lib/fetches';
import styles from './sg.module.css';
import StoryItem from './story-item';
import StoriesFetcher from './stories-fetcher';
import { getEntriesKey } from '@/utils/clientHelpers';
import { GroqStoriesParams, STORIES_BATCH_SIZE } from '@/utils/serverHelpers';
import { StoryPreview } from '@/sanity/lib/types';

export default async function StoriesGrid({fetchParams}: {fetchParams?: GroqStoriesParams}) {
    const stories = await getStories(fetchParams);

    if (!stories)
        throw new Error('Failed to fetch stories');

    const lastStory : StoryPreview | undefined = stories[stories.length - 1];

    return <>
        {stories.length > 0 && <div className={styles.g}>
            {stories.map(story => <StoryItem key={story.slug} story={story}/>)}
        </div>}
    
        {stories.length === 0 && <div className={styles.emp}>No stories in this category</div>}

        <StoriesFetcher initInfo={{
            key: getEntriesKey(fetchParams?.catId),
            hasMore: stories.length === STORIES_BATCH_SIZE,
            lastDate: lastStory?.date || ''
        }} />
    </>
}
import { getStories } from '@/sanity/lib/fetches';
import styles from './sg.module.css';
import StoryItem from './story-item';
import StoriesFetcher from './stories-fetcher';
import { makeFetcherInitInfo } from '@/utils/serverHelpers';
import { GroqStoriesParams } from '@/utils/types';
import { STORIES_BATCH_SIZE } from '@/utils/env-fallback';

export default async function StoriesGrid({ fetchParams }: { fetchParams?: GroqStoriesParams }) {
    const stories = await getStories(fetchParams);

    if (!stories)
        throw new Error('Failed to fetch stories');

    return <div className={styles.g}>
        {stories.map(story => <StoryItem key={story.slug} story={story} />)}

        {stories.length === 0 && <div className={styles.emp}>No stories in this category</div>}
        
        <StoriesFetcher initInfo={makeFetcherInitInfo(stories, STORIES_BATCH_SIZE, fetchParams?.catId)} />

    </div>
}
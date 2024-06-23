import StoryItem from "@/components/stories/story-item";
import { STORIES_BATCH_SIZE } from "@/utils/env-fallback";
import styles from './sg.module.css';

export default function StoriesSkeletonGrid() {
    const ns : number[] = [];
    for (let i = 0; i < STORIES_BATCH_SIZE; i++)
        ns.push(i);

    return <div className={styles.g}>
        {ns.map(n => <StoryItem key={n} story={null} />)}
    </div>
}
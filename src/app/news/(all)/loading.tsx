import { NewsSkeletonItem } from "@/components/news/news-skeleton";
import { NEWS_BATCH_SIZE } from "@/utils/serverHelpers";

export default function NewsLoading() {

    const items : number[] = [];
    for (let i = 0; i < NEWS_BATCH_SIZE; i++) {
        items.push(i);
    }
    return <>
        {items.map(i => <NewsSkeletonItem key={i} />)}
    </>
}
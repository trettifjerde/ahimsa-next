import Article from "@/components/article/article";
import { getStory } from "@/sanity/lib/fetches";
import { getPageOGMeta } from "@/utils/serverHelpers";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: { slug: string } };

export default async function StoryPage({ params }: Props) {

    const story = await getStory(params.slug);

    if (!story)
        notFound();

    return <Article article={story}/>
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const story = await getStory(params.slug);

    if (story)

        return {
            title: `${story.title} | Ahimsa`,
            description: story.excerpt,
            openGraph: getPageOGMeta(story.image),
        }

    else {
        return {};
    }
}
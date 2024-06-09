import Article from "@/components/article/article";
import { getCategories, getStory } from "@/sanity/lib/fetches";
import { getMetaImageUrl } from "@/utils/image-helpers";
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

export async function generateStaticParams() {
    const categories = await getCategories();

    if (!categories) 
        return [];
    
    return categories.map(cat => ({slug: cat.name}));
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
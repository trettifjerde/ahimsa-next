import Article from "@/components/article/article";
import { getCategories, getStory } from "@/sanity/lib/fetches";
import { notFound } from "next/navigation";

export default async function StoryPage({ params }: { params: { slug: string } }) {

    const story = await getStory(params.slug);

    if (!story)
        notFound();

    return <Article article={story} backBtnText="back to stories" />
}

export async function generateStaticParams() {
    const categories = await getCategories();

    if (!categories) 
        return [];
    
    return categories.map(cat => ({slug: cat.name}));

}
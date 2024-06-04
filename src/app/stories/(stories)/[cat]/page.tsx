import StoriesGrid from "@/components/stories/stories-grid";
import { getCategories } from "@/sanity/lib/fetches";
import { getGroqStoriesParams } from "@/utils/serverHelpers";

export default async function StoriesPage({params}: {params: {cat: string}}) {
    const fetchParams = getGroqStoriesParams({selectedCat: params.cat});
    return <StoriesGrid fetchParams={fetchParams}/>
}

export async function generateStaticParams() {
    const categories = await getCategories();
    return categories.map(cat => ({cat: cat.name}));
}
import StoriesGrid from "@/components/stories/stories-grid";
import { getCategories, getCategoryId } from "@/sanity/lib/fetches";
import { getStoriesPageGroqParams } from "@/utils/serverHelpers";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: { cat: string } };

export default async function StoriesPage({params}: Props) {
    const fetchParams = await getStoriesPageGroqParams(params.cat);

    if (!fetchParams)
        notFound();

    return <StoriesGrid fetchParams={fetchParams}/>
}

export async function generateStaticParams() {
    const categories = await getCategories();
    return categories.map(cat => ({cat: cat.name}));
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const catName = await getCategoryId(params.cat)

    if (catName)

        return {
            title: `Priče: ${params.cat} | Ahimsa`,
        }

    else {
        return {};
    }
}
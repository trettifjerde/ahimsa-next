import StoriesGrid from "@/components/stories/stories-grid";
import { getCategories, getCategoryId } from "@/sanity/lib/fetches";
import { getStoriesPageGroqParams } from "@/utils/serverHelpers";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: { slug: string } };

export default async function StoriesPage({params}: Props) {
    const fetchParams = await getStoriesPageGroqParams(params.slug);

    if (!fetchParams)
        notFound();

    return <StoriesGrid fetchParams={fetchParams}/>
}

export async function generateStaticParams() {
    const categories = await getCategories();

    if (!categories) 
        return [];
    
    return categories.map(cat => ({slug: cat.slug}));
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const catInfo = await getCategoryId(params.slug)

    if (catInfo)

        return {
            title: `Priče: ${catInfo.name} | Ahimsa`,
        }

    else {
        return {};
    }
}
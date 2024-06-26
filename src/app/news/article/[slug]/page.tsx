import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNewsArticle } from "@/sanity/lib/fetches";
import Article from "@/components/article/article";
import { getPageOGMeta } from "@/utils/serverHelpers";

type Props = { params: { slug: string } };

export default async function NewsItem({ params }: Props) {

    const news = await getNewsArticle(params.slug);

    if (!news)
        notFound();

    return <Article article={news} />
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const news = await getNewsArticle(params.slug);

    if (news)

        return {
            title: `${news.title} | Ahimsa`,
            description: news.excerpt,
            openGraph: getPageOGMeta(news.image),
        }

    else {
        return {};
    }
}
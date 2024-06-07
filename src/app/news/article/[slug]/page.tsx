import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArtcile } from "@/sanity/lib/fetches";
import Article from "@/components/article/article";
import { getMetaImageUrl } from "@/utils/image-helpers";

type Props = { params: { slug: string } };

export default async function NewsItem({ params }: Props) {

    const news = await getArtcile(params.slug);

    if (!news)
        notFound();

    return <Article article={news} backBtnText="back to news" backUrl="/news" />
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const news = await getArtcile(params.slug);

    if (news)

        return {
            title: news.title,
            description: news.excerpt,
            openGraph: {
                images: [getMetaImageUrl(news.image)],
            },
        }

    else {
        return {};
    }
}
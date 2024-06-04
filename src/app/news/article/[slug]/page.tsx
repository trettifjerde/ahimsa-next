import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArtcile } from "@/sanity/lib/fetches";
import { getImageUrl } from "@/utils/image-helpers";
import Article from "@/components/article/article";

type Props = { params: { slug: string } };

export default async function NewsItem({ params }: Props) {

    const news = await getArtcile(params.slug);

    if (!news)
        notFound();

    return <Article article={news} backBtnText="back to news" />
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
                images: [getImageUrl(news.image)],
            },
        }

    else {
        return {};
    }
}